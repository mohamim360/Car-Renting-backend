import { Types } from "mongoose";

export interface IUser {
	name: string;
	img: string;
	rating: number;
	email: string;
	password: string;
	role: 'user' | 'admin' | 'driver';
	rents: Types.ObjectId;
}