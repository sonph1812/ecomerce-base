import { ExtractJwt, Strategy } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";

// type JwtPayload = Pick<User, 'id' | 'role'> & { iat: number; exp: number };

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private jwtService: JwtService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: process.env.JWT_ADMIN_SECRET,
		});
	}

	public validate(payload) {
		if (!payload.id) {
			throw new UnauthorizedException();
		}

		return payload;
	}
}
