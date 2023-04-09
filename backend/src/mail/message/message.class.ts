export class Message {
  private subject: string;
  private text: string;

  protected constructor(subject: string, text: string) {
    this.subject = subject;
    this.text = text;
  }

  public getText(): string {
    return this.text;
  }

  public getSubject(): string {
    return this.subject;
  }
}
