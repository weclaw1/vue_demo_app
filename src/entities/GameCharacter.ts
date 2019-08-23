export enum CharacterClass {
    Knight = "Knight",
    Paladin = "Paladin",
    Mage = "Mage",
    Druid = "Druid",
}

export class GameCharacter {
    public id?: number;
    public characterName: string;
    public level: number;
    public characterClass: CharacterClass;

    constructor(id: number | undefined, characterName: string, level: number, characterClass: CharacterClass) {
        this.id = id;
        this.characterName = characterName;
        this.level = level;
        this.characterClass = characterClass;
    }
}
