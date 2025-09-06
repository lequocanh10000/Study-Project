export class Helper {
  static formatDates = (obj: any): any => {
    if(obj === null || obj === undefined) {
      return obj;
    }
    if(obj instanceof Date) {
      return obj.toLocaleString('vi-VN', {
        timeZone: 'Asia/Ho_Chi_Minh',
        hour12: false
      }).split(' ')[1];
    }
    if(Array.isArray(obj)) {
      return obj.map(item => this.formatDates(item))
    }
    if(typeof obj === 'object') {
      const formatted = {};
      for (const key in obj) {
        formatted[key] = this.formatDates(obj[key])
      }
      return formatted;
    }
    return obj;
  }

  static generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
}

export default Helper;