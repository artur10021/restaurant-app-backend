import {ApiProperty} from "@nestjs/swagger";

export class CreateBurgerDto{
    @ApiProperty({example:'cheeseburger', description: 'burger name'})
    readonly name: string;

    @ApiProperty({example:5, description: 'burger price'})
    readonly price: number;

    @ApiProperty({example:'bread, cheese', description: 'ingredients'})
    readonly ingredients: string;

    @ApiProperty({example:'example.jpg', description: 'image file'})
    readonly image: string;

}