import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("bullet-prices")
export class BulletPriceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  price: number;
}