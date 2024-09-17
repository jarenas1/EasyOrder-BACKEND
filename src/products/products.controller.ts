import { Body, Controller, Delete, Get, Param, ParseIntPipe, ParseUUIDPipe, Patch, Post } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDto } from './dto/product.dto';
import { Product } from './product.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';


@ApiTags('products')
@Controller('products')
export class ProductsController {
    constructor(private readonly productService: ProductsService) { }

    @Post()
    @ApiOperation({summary: 'Create a new product'})//swagger
    @ApiResponse({status: 200, description: 'New product has been created'})
    @ApiResponse({status: 409, description: 'Conflict, product already exists'})
    createProduct(@Body() newProduct: ProductDto) {
        return this.productService.createProduct(newProduct);
    }

    @Get()
    @ApiOperation({summary: 'Get all products'})//swagger
    @ApiResponse({status: 200, description: 'All products'})
    getProducts(): Promise<Product[]> {
        return this.productService.getProducts();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get product by id'})//swagger
    @ApiResponse({status: 200, description: 'Product found'})
    @ApiResponse({status: 404, description: 'Product has not been found'})
    getProductById(@Param('id', ParseUUIDPipe) id: string) {
        return this.productService.getProductById(id);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete product by id'})//swagger
    @ApiResponse({status: 200, description: 'Product deleted successfully'})
    @ApiResponse({status: 404, description: 'Product has not been found'})
    deleteProduct(@Param('id', ParseUUIDPipe) id: string) {
        return this.productService.deleteProduct(id);
    }

    @Patch(':id')
    @ApiOperation({summary: 'Delete product by id'})//swagger
    @ApiResponse({status: 200, description: 'Product deleted successfully'})
    @ApiResponse({status: 404, description: 'Product has not been found'})
    updateProduct(@Param('id', ParseUUIDPipe) id: string, @Body() updatedProduct: ProductDto) {
        return this.productService.updateProduct(id, updatedProduct);
    }
}
