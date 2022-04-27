import { EntityRepository, Repository } from 'typeorm'
import { ResultEntity } from './result.entity'

@EntityRepository(ResultEntity)
export class ResultRepository extends Repository<ResultEntity> {}
