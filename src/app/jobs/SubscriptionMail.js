import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { meetup } = data;
    const formattedDate = format(
      parseISO(meetup.date),
      "dd 'de' MMMM' de 'yyyy', às' H:mm'h'",
      { locale: pt }
    );

    await Mail.sendMail({
      to: `${meetup.User.name} <${meetup.User.email}>`,
      subject: 'Inscrição Realizada',
      template: 'subscription',
      context: {
        user: meetup.User.name,
        id: meetup.id,
        title: meetup.title,
        date: formattedDate,
      },
    });
  }
}

export default new SubscriptionMail();
