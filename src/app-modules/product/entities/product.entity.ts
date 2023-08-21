import { Column, Entity, JoinTable, ManyToMany } from "typeorm";
import { BaseEntity } from "../../../common/entities/base-entity";
import { UserEntity } from "../../users/entities/user.entity";

@Entity("product")
export class Product extends BaseEntity {
	@Column()
	name: string;

	@Column()
	slug: string;

	@Column()
	price?: number;

	@Column()
	priceBeforeDiscount: number | null;

	@Column({ default: 0 })
	sold?: number | null;

	@Column({ default: 0 })
	viewCount?: number | null;

	@ManyToMany(() => UserEntity, { eager: false })
	@JoinTable({
		name: "likes",
	})
	likedUsers: UserEntity[];
}
