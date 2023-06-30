import { Module } from '@nestjs/common';
import { ProcessService } from './process.service';
import { ProcessController } from './process.controller';
import { DeploymentModule } from 'src/ci/deployment/deployment.module';

@Module({
  controllers: [ProcessController],
  providers: [ProcessService],
  imports: [DeploymentModule],
})
export class ProcessModule {}
