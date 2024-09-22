import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { VagaTag } from "../model/vagatag.entity";

@Injectable()
export class VagaTagService {
}