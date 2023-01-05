import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { JobQueriesDto } from './dto/job-queries.dto';

@Injectable()
export class JobsService {
  async findAll(queries: JobQueriesDto) {
    const res = await axios({
      url: 'http://dev3.dansmultipro.co.id/api/recruitment/positions.json',
      params: queries,
    });

    return res.data;
  }

  async findOne(id: number) {
    const res = await axios({
      url: `http://dev3.dansmultipro.co.id/api/recruitment/positions.json/${id}`,
    });

    return res.data;
  }
}
