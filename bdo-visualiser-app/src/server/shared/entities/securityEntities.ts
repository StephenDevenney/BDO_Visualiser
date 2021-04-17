// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class NavMenuEntity
// {
// 	@PrimaryGeneratedColumn()
// 	public navMenuId: number = 0;

// 	@Column()
// 	public navName: string = "";

//     @Column()
// 	public navTitle: string = "";

//     @Column()
// 	public navRoute: string = "";
// }


export class NavMenuEntity {
    constructor(navMenuId: number, navName: string, navTitle: string, navRoute: string) {}
    public navMenuId: number = 0;
    public navName: string = "";
    public navTitle: string = "";
    public navRoute: string = "";
}