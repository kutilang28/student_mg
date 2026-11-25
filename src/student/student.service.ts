import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    try {
      return await this.prisma.student.create({
        data: createStudentDto,
      });
    } catch (error) {
      if (error === 'P2002') {
        throw new ConflictException('NIM atau Email sudah terdaftar');
      }
      throw error;
    }
  }

  async findAll(major?: string, semester?: number) {
    return await this.prisma.student.findMany({
      where: {
        ...(major && { major: { contains: major, mode: 'insensitive' } }),
        ...(semester && { semester: Number(semester) }),
      },
      orderBy: { id: 'asc' },
    });
  }

  async findOne(id: number) {
    const student = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!student) {
      throw new NotFoundException(`Mahasiswa dengan ID ${id} tidak ditemukan`);
    }

    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto) {
    await this.findOne(id);
    return await this.prisma.student.update({
      where: { id },
      data: updateStudentDto,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return await this.prisma.student.delete({
      where: { id },
    });
  }

  async getStatistics() {
    const totalStudents = await this.prisma.student.count();
    const byMajor = await this.prisma.student.groupBy({
      by: ['major'],
      _count: { id: true },
      _avg: { gpa: true },
    });

    return {
      totalStudents,
      breakdownByMajor: byMajor.map((item) => ({
        major: item.major,
        count: item._count.id,
        averageGpa: Number((item._avg.gpa ?? 0).toFixed(2)),
      })),
    };
  }
}