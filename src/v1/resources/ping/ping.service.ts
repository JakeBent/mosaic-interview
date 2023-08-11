import { Service } from '@base';
import { DBConnectionError } from '@common/errors';

export default class PingService extends Service {
  public read = async () => {
    if (this.mongoose.connection.readyState !== 1) {
      throw new DBConnectionError();
    }

    return 'OK';
  };
}
