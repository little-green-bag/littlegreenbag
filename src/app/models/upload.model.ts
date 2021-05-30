export class UploadModel {
  $key: string;
  file: File;
  name: string;
  url: string;
  progress: number;
  createdAt: Date = new Date();

  constructor(file: File) {
    this.file = file;
  }
}

export class UploadProgressModel {
  percentage: any;
  snapshot: any;
  constructor(progressModel: UploadProgressModel) {
    this.percentage = progressModel.percentage;
    this.snapshot = progressModel.snapshot;
  }
}