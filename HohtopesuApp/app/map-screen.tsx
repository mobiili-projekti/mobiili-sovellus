import { useEffect, useState, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Region } from "react-native-maps";
import * as Location from "expo-location";
import { router } from "expo-router";

type CarWash =
{
    id: string;
    title: string;
    address: string;
    latitude: number;
    longitude: number;
};

const carWashes: CarWash[] =
[
    {
        id: "1",
        title: "Oulun Hohtopesu",
        address: "Nummikatu 5",
        latitude: 65.0105,
        longitude: 25.4584
    },
    {
        id: "2",
        title: "Kuopion Hohtopesu",
        address: "Savonkatu 22",
        latitude: 62.8920,
        longitude: 27.6743
    }
];



export default function MapScreen()
{
    const [region, setRegion] = useState<Region | null>(null);
    const [selectedWash, setSelectedWash] = useState<CarWash | null>(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const mapRef = useRef<MapView | null>(null);
    const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);



    useEffect(() =>
    {
        (async () =>
        {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted")
            {
                return;
            }

            const location = await Location.getCurrentPositionAsync({});
            setUserLocation(
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude
            });
            setRegion(
            {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01
            });
        })();
    }, []);

    if (!region)
    {
        return <View />;
    }

    function getDistance(
        lat1: number,
        lon1: number,
        lat2: number,
        lon2: number
    )
    {
        const toRad = (value: number) => value * Math.PI / 180;

        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLon = toRad(lon2 - lon1);

        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
            Math.sin(dLon / 2) * Math.sin(dLon / 2);

        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return R * c;
    }


    function showClosestCarWash()
    {
        if (!userLocation)
        {
            return;
        }

        let closest = carWashes[0];
        let minDistance = getDistance(
            userLocation.latitude,
            userLocation.longitude,
            closest.latitude,
            closest.longitude
        );

        for (const wash of carWashes)
        {
            const distance = getDistance(
                userLocation.latitude,
                userLocation.longitude,
                wash.latitude,
                wash.longitude
            );

            if (distance < minDistance)
            {
                minDistance = distance;
                closest = wash;
            }
        }

        mapRef.current?.animateToRegion(
        {
            latitude: closest.latitude,
            longitude: closest.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01
        },
        600
        );

        setSelectedWash(closest);
    }


    return (
        <View style={styles.container}>
            {/* Hamburger button */}
            <View style={styles.topBar}>
            <Pressable
                style={styles.hamburger}
                onPress={() => setMenuOpen(!menuOpen)}
            >
                <Text style={styles.hamburgerText}>☰</Text>
            </Pressable>
            </View>

            <View style={styles.mapCard}>
                <MapView
                ref={mapRef}
                style={styles.map}
                region={region}
                showsUserLocation
                onPress={() => setSelectedWash(null)}
            >
                {carWashes.map(wash =>
                (
                    <Marker
                        key={wash.id}
                        coordinate={{
                            latitude: wash.latitude,
                            longitude: wash.longitude
                        }}
                        onPress={() => setSelectedWash(wash)}
                    />
                ))}
            </MapView>
            </View>
            {/* Right-side menu */}
            {menuOpen && (
                <View style={styles.menu}>
                    <Pressable
                        onPress={() => setMenuOpen(false)}
                        style={styles.closeButton}
                    >
                        <Text style={styles.closeText}>✕</Text>
                    </Pressable>

                    <View style={styles.menuHeader}>
                        <Text style={styles.userName}>Etunimi Sukunimi</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <Text style={styles.icon}>👤</Text>
                        <Text style={styles.menuText}>Tilitiedot</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <Text style={styles.icon}>🔁</Text>
                        <Text style={styles.menuText}>Kuukausisopimus</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <Text style={styles.icon}>⏪</Text>
                        <Text style={styles.menuText}>Pesuhistoria</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <Text style={styles.icon}>💳</Text>
                        <Text style={styles.menuText}>Maksutiedot</Text>
                    </View>

                    <Pressable
                        style={styles.menuItem}
                        onPress={() => router.push("/statistics")}
                    >
                        <Text style={styles.icon}>📊</Text>
                        <Text style={styles.menuText}>Tilastot</Text>
                    </Pressable>

                    <Text style={styles.sectionTitle}>Asiakaspalvelu ja tuki</Text>

                    <View style={styles.menuItem}>
                        <Text style={styles.icon}>⚠️</Text>
                        <Text style={styles.menuText}>Raportoi vika</Text>
                    </View>

                    <View style={styles.menuItem}>
                        <Text style={styles.icon}>📞</Text>
                        <Text style={styles.menuText}>Ota yhteyttä Hohtopesuun</Text>
                    </View>
                </View>
            )}


            {!selectedWash && (
                <Pressable
                    style={styles.closestButton}
                    onPress={showClosestCarWash}
                >
                    <Text style={styles.closestText}>Näytä lähin</Text>
                </Pressable>
            )}


            {/* Bottom sheet */}
            {selectedWash && (
                <View style={styles.bottomSheet}>
                    <Text style={styles.title}>{selectedWash.title}</Text>
                    <Text>{selectedWash.address}</Text>

                    <Pressable
                        style={styles.selectButton}
                        onPress={() =>
                            router.push({
                                pathname: "/carwash-confirmation",
                                params:
                                {
                                    id: selectedWash.id,
                                    title: selectedWash.title,
                                    address: selectedWash.address
                                }
                            })
                        }
                    >
                        <Text style={styles.selectText}>Valitse</Text>
                    </Pressable>
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create(
{
    container:
    {
        flex: 1,
    },
    topBar:
    {
        height: 60,
        justifyContent: "center",
        alignItems: "flex-end",
        paddingHorizontal: 16,
    },
    mapCard:
    {
        height: "75%",
        width: "95%",
        alignSelf: "center",
        marginTop: 1,
        borderRadius: 16,
        overflow: "hidden",
        borderWidth: 1,
        borderColor: "#ddd"
    },
    map:
    {
        flex: 1
    },
    hamburger:
    {
        alignSelf: "flex-end",
    },
    hamburgerText:
    {
        fontSize: 28
    },
    menu:
    {
        position: "absolute",
        top: 0,
        right: 0,
        width: Dimensions.get("window").width * 0.7,
        height: "100%",
        backgroundColor: "white",
        paddingTop: 60,
        paddingHorizontal: 20,
        zIndex: 15
    },
    menuHeader:
    {
        flexDirection: "row",
        alignItems: "flex-start",
        justifyContent: "space-between",
        marginBottom: 24
    },
    userName:
    {
        fontSize: 18,
        fontWeight: "600"
    },
    menuItem:
    {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 12
    },
    icon:
    {
        width: 32,
        fontSize: 18
    },
    menuText:
    {
        fontSize: 16,
        color: "#555"
    },
    sectionTitle:
    {
        marginTop: 24,
        marginBottom: 12,
        fontSize: 14,
        fontWeight: "600",
        color: "#000"
    },
    bottomSheet:
    {
        position: "absolute",
        bottom: 45,
        width: Dimensions.get("window").width,
        backgroundColor: "white",
        padding: 20,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        elevation: 10
    },
    title:
    {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 4
    },
    selectButton:
    {
        marginTop: 16,
        backgroundColor: "#2563eb",
        padding: 14,
        borderRadius: 8
    },
    selectText:
    {
        color: "white",
        textAlign: "center",
        fontWeight: "600"
    },
    closestButton:
    {
        position: "absolute",
        bottom: 45,
        alignSelf: "center",
        backgroundColor: "#2563eb",
        paddingHorizontal: 24,
        paddingVertical: 14,
        borderRadius: 24,
        elevation: 6
    },
    closestText:
    {
        color: "white",
        fontWeight: "600"
    },
    closeButton:
    {
        position: "absolute",
        top: 16,
        right: 16,
        width: 32,
        height: 32,
        justifyContent: "center",
        alignItems: "center",
        zIndex: 20
    },
    closeText:
    {
        fontSize: 22,
        fontWeight: "600",
        lineHeight: 22
    }
});
