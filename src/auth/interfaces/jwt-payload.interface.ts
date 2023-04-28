import { Request as HttpRequest } from 'express';

export default interface JwtAuthPayload {
    id: string;
}

export type AuthRequest = HttpRequest & { user: JwtAuthPayload };