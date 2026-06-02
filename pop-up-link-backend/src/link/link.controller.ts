import { Controller, Post, Body, UseGuards, Req } from '@nestjs/common';
import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/create-link.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guards'; // 👈 JWT 인증 가드 임포트
// import { UpdateLinkDto } from './dto/update-link.dto';

@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  // POST http://localhost:3000/link
  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@Body() createLinkDto: CreateLinkDto, @Req() req: any) {

    // 경호원(JwtAuthGuard)이 손님의 티켓을 검사한 뒤, 
    // "이 사람은 1번 유저 민규님입니다" 하고 
    // 배달 요청 주머니(@Req) 안의 'user' 칸에 쏙 넣어놨습니다.
    const user = req.user;

    return await this.linkService.create(createLinkDto, user);
  }
}

/*
@Controller('link')
export class LinkController {
  constructor(private readonly linkService: LinkService) {}

  @Post()
  create(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.create(createLinkDto);
  }

  @Get()
  findAll() {
    return this.linkService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.linkService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLinkDto: UpdateLinkDto) {
    return this.linkService.update(+id, updateLinkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.linkService.remove(+id);
  }
}
*/
