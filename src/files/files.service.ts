import {HttpException, HttpStatus, Injectable} from '@nestjs/common';

import * as path from "path"; // стандартный модуль для работы с путями в node
import * as fs from 'fs'; // стандартный модуль для работы с файлами в node
import * as uuid from "uuid"; // для генерации рандомново названия изображения

@Injectable()
export class FilesService {

    async createFile(file): Promise<string>{
        try {

            const fileName = uuid.v4() + '.jpg';
            const filePath = path.resolve(__dirname, '..', 'static')

            if(!fs.existsSync(filePath)){ // если по этому пути ничего не существует то создадим такую папку
                fs.mkdirSync(filePath, {recursive: true});
            }
            fs.writeFileSync(path.join(filePath, fileName), file.buffer);
            return fileName;
        }
        catch (e){

            console.log(e)
            throw new HttpException("произошла ошибка при записи изоброжения на диск", HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
