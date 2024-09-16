import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { Repository } from 'typeorm';
import { ProductDto } from './dto/product.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product) private productRespository: Repository<Product>
    ) { }

    async createProduct(product: ProductDto) {
        //Vamos a asegurarnos que no exista el producto que se va a crear
        const productFound = await this.productRespository.findOne({
            where: {
                name: product.name
            }
        });
        console.log(productFound);
        

        if (productFound) {
            return new HttpException(`Producto ya existe: ${product.name}`, HttpStatus.CONFLICT);
        }

        const newProduct = this.productRespository.create(product);
        const saveProduct = await this.productRespository.save(newProduct);
        return saveProduct;
    }

    getProducts() {
        return this.productRespository.find();
    }

    async getProductById(id: string) {
        const productFound = await this.productRespository.findOne({
            where: {
                id
            },
            // relations: ['requests'] //Este visaje lo quito porque no quiero que se me muestre un array en products de las request
        });
        //Si el producto no existe, lanzamos una excepción
        if (!productFound) {
            return new HttpException(`Producto no encontrado: ${id}`, HttpStatus.NOT_FOUND);
        }

        return productFound;
    }

    async deleteProduct(id: string) {
        const result = await this.productRespository.delete({ id });

        if (result.affected === 0) {
            return new HttpException(`Producto no encontrado: ${id}`, HttpStatus.NOT_FOUND);
        }

        return result;
    }

    async updateProduct(id: string, product: ProductDto) {
        const productFound = await this.productRespository.findOne({
            where: {
                id
            }
         });

        if (!productFound) {
            return new HttpException(`Producto no encontrado: ${id}`, HttpStatus.NOT_FOUND);
        }

        return this.productRespository.update(id, product);
    }
}
