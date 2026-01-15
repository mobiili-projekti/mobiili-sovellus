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

            {/* Hamburger button */}
            <Pressable
                style={styles.hamburger}
                onPress={() => setMenuOpen(!menuOpen)}
            >
                <Text style={styles.hamburgerText}>☰</Text>
            </Pressable>

            {/* Right-side menu */}
            {menuOpen && (
                <View style={styles.menu}>
                    <Text>Etunimi Sukunimi</Text>
                    <Text>Tilitiedot</Text>
                    <Text>Kuukausisopimus</Text>
                    <Text>Pesuhistoria</Text>
                    <Text>Maksutiedot</Text>
                    <Text>Asiakastuki</Text>
                    <Text>Raportoi vika</Text>
                    <Text>Ota yhteyttä asiakastukeen</Text>
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
        flex: 1
    },
    map:
    {
        flex: 1
    },
    hamburger:
    {
        position: "absolute",
        top: 50,
        right: 20,
        zIndex: 20
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
        width: Dimensions.get("window").width * 0.5,
        height: "100%",
        backgroundColor: "white",
        padding: 20,
        zIndex: 15
    },
    bottomSheet:
    {
        position: "absolute",
        bottom: 0,
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
        bottom: 30,
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
    }

});
