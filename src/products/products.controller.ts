import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    createProduct(@Body() newProduct: ProductDto) {
        return this.productService.createProduct(newProduct);
    }

    @Get()
    getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Get(':id')
    getProductById(@Param('id', ParseIntPipe) id: number) {
        return this.productService.getProductById(id);
    }

    @Delete(':id')
    deleteProduct(@Param('id', ParseIntPipe) id: number) {
        return this.productService.deleteProduct(id);
    }

    @Patch(':id')
    updateProduct(@Param('id', ParseIntPipe) id: number, @Body() updatedProduct: ProductDto) {
        return this.productService.updateProduct(id, updatedProduct);
    }
}
