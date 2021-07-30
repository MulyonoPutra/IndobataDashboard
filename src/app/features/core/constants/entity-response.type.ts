import { HttpResponse } from "@angular/common/http";
import { Category, ICategory } from "../domain/entities/category";
import { Clients, IClients } from "../domain/entities/clients";
import { Feedback, IFeedback } from "../domain/entities/feedback";
import { IProduct, Product } from "../domain/entities/product";

export type EntityResponseCategoryType = HttpResponse<ICategory>;
export type EntityResponseProductType = HttpResponse<IProduct>;
export type EntityResponseClientsType = HttpResponse<IClients>;
export type EntityResponseFeedbackType = HttpResponse<IFeedback>;


export type EntityArrayResponseCategoryType = HttpResponse<Category[]>;
export type EntityArrayResponseProductType = HttpResponse<Product[]>;
export type EntityArrayResponseClientsType = HttpResponse<Clients[]>;
export type EntityArrayResponseFeedbackType = HttpResponse<Feedback[]>;
