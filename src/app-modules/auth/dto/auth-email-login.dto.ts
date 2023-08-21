import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Validate } from "class-validator";
import { Transform } from "class-transformer";
import { IsNotExist } from "../../../common/validators/is-not-exists.validator";

export class AuthEmailLoginDto {
	@ApiProperty({ example: "admin@example.com" })
	@Transform(({ value }) => value.toLowerCase().trim())
	email: string;

	@ApiProperty()
	@IsNotEmpty()
	password: string;
}
