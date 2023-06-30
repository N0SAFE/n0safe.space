import { Injectable, Logger } from '@nestjs/common';
import { Domain, Project } from '@prisma/client';

@Injectable()
export class DeploymentService {
  private readonly logger: Logger = new Logger(DeploymentService.name);
  deploy(domain: Domain, project: Project) {
    return {
      domain,
      project,
    };
  }
}
