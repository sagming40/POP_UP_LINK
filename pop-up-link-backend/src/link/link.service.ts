import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLinkDto } from './dto/create-link.dto';
import { Link } from './entities/link.entity';
// import { UpdateLinkDto } from './dto/update-link.dto';

@Injectable()
export class LinkService {
  constructor(
    @InjectRepository(Link)
    private readonly linkRepository: Repository<Link>,
  ) {}

  // 링크 생성 메서드
  async create(createLinkDto: CreateLinkDto, user: any): Promise<Link> {
    const { title, url, sequence } = createLinkDto;

    // TypeORM : 관계 매핑이 되어있기 때문에, Link 엔티티의 user 속성에 User 엔티티 객체를 할당하면,
    // 자동으로 userId 컬럼에 User 엔티티의 id 값이 저장됩니다.
    const link = this.linkRepository.create({
      title,
      url,
      sequence: sequence ?? 0, // sequence가 제공되지 않으면 기본값으로 0을 사용
      user, // Link 엔티티의 user 속성에 User 엔티티 객체를 할당 (로그인한 유저 정보)
    });

    return await this.linkRepository.save(link); // DB에 저장된 Link 엔티티 반환
  }
}

/*
@Injectable()
export class LinkService {
  create(createLinkDto: CreateLinkDto) {
    return 'This action adds a new link';
  }

  findAll() {
    return `This action returns all link`;
  }

  findOne(id: number) {
    return `This action returns a #${id} link`;
  }

  update(id: number, updateLinkDto: UpdateLinkDto) {
    return `This action updates a #${id} link`;
  }

  remove(id: number) {
    return `This action removes a #${id} link`;
  }
}
*/
