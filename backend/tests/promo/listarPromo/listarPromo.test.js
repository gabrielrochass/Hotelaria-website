import { defineFeature, loadFeature } from "jest-cucumber";
import supertest from "supertest";
import app from "../../..";

const feature = loadFeature("./tests/promo/listarPromo/listarPromo.feature");
const request = supertest(app);

defineFeature(feature, (test) => {
    
});