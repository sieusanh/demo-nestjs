import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { BaseDto, BaseEntity } from '.';

export class ModelMapper<
    Dto extends BaseDto, 
    Entity extends BaseEntity
> {
    // private dto?: Dto;
    // private model?: Model;
    // private entity?: Entity;

    // constructor(dto: Dto, model: Model, entity: Entity) {
    //     this.dto = dto;
    //     this.model = model;
    //     this.entity = entity;
    // }

    constructor(
        private dto?: Dto,
        private entity?: Entity
    ) {}

    setDto(dto: Dto) {
        if (dto) {
            this.dto = dto;
        }
    }

    setEntity(entity: Entity) {
        if (entity) {
            this.entity = entity;
        }
    }

    convertDtoToEntity(): Entity | null {
        if (!this.entity || !this.dto) {
            return null;
        }
        return Object.assign(this.entity, this.dto);
    }

    convertEntityToDto(): Dto | null {
        if (!this.dto || !this.entity) {
            return null;
        }
        return Object.assign(this.dto, this.entity);
    }

    convertDtoToPartialEntity(): QueryDeepPartialEntity<Entity> | null {
        if (!this.entity || !this.dto) {
            return null;
        }
        const entity = Object.assign(this.entity, this.dto);
        const partialEntity: QueryDeepPartialEntity<Entity> 
            = entity as QueryDeepPartialEntity<Entity>;
        
        return partialEntity;
    }


}
