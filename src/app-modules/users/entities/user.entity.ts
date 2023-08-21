import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { BaseEntity } from "../../../common/entities/base-entity";
import * as bcrypt from "bcrypt";

@Entity("user")
export class UserEntity extends BaseEntity {
	@Column()
	name: string;

	@Column()
	email: string;

	@Column()
	password: string;

	public previousPassword: string;

	@BeforeInsert()
	@BeforeUpdate()
	async setPassword() {
		if (this.previousPassword !== this.password && this.password) {
			const salt = await bcrypt.genSalt();
			this.password = await bcrypt.hash(this.password, salt);
		}
	}
}
