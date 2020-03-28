import express from 'express';

export default abstract class AbstractController {
    abstract path: string;

    abstract router: express.Router;
}
