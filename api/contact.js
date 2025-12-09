import { Resend } from 'resend';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }
    try {
        const { name, email, message, to } = req.body || {};
        if (!name || !email || !message || !to) {
            res.status(400).json({ error: 'Faltan campos requeridos' });
            return;
        }

        const resend = new Resend(process.env.RESEND_API_KEY);
        const subject = `Nuevo contacto de ${name}`;
        const html = `
      <div style="font-family: Inter, Arial, sans-serif; line-height:1.5;">
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br/>')}</p>
      </div>
    `;

        await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>',
            to,
            subject,
            html,
            reply_to: email,
        });

        res.status(200).json({ ok: true });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Error enviando email' });
    }
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}
