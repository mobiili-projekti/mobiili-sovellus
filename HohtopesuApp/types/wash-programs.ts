export type WashProgram = {
    id: "HARJATON" | "HARJA" | "VAHA" | "LUKSUS" 
    name: string;
    durationSeconds: number;
    priceCents: number;
    description: string;
};

export const washPrograms: WashProgram[] = [
    {
        id: "HARJATON",
        name: "Harjaton Pesu",
        durationSeconds: 600,
        priceCents: 2000,
        description: "Nopea ja kevyt pesu vähäisen lian poistamiseen.",
    },
    {
        id: "HARJA",
        name: "Harjapesu",
        durationSeconds: 940,
        priceCents: 2290,
        description: "Pikainen peruspesu pehmoharjoilla.",
    },
    {
        id: "VAHA",
        name: "Vahapesu",
        durationSeconds: 1200,
        priceCents: 2490,
        description: "Perusteellinen harjapesu, joka viimeistellään auton vahasuojauksella.",
    },
    {
        id: "LUKSUS",
        name: "Luksuspesu",
        durationSeconds: 1640,
        priceCents: 2990,
        description: "Tämä pesu sisältää kaiken. Erittäin perusteellinen harjapesu, vannepesu ja kiillotusvahaus.",
    }
];