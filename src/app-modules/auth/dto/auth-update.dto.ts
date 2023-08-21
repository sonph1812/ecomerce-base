import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsOptional, IsPhoneNumber, MinLength, Validate } from "class-validator";
import { Transform } from "class-transformer";

export class AuthUpdateDto {
	@ApiProperty({ example: "admin@example.com" })
	@IsOptional()
	@Transform(({ value }) => value.toLowerCase().trim())
	email: string;

	@ApiProperty()
	@IsOptional()
	username?: string | null;

	@ApiProperty({ example: "Nguyen Tuan Hung" })
	@IsOptional()
	@IsNotEmpty({ message: "mustBeNotEmpty" })
	fullName?: string;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty()
	birthday?: Date;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty()
	gender?: string;

	@ApiProperty()
	@IsOptional()
	@IsPhoneNumber("VN")
	phoneNumber?: string;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty()
	@MinLength(6)
	password?: string;

	@ApiProperty()
	@IsOptional()
	@IsNotEmpty({ message: "mustBeNotEmpty" })
	oldPassword: string;
}
