import { Section } from '@/components/ui/Section';

export function PrivacyPageContent({ locale }: { locale: string }) {
  const isPt = locale === 'pt';

  return (
    <Section bg="surface">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-heading font-bold text-text-primary md:text-4xl">
          {isPt ? 'Privacidade & Termos' : 'Privacy & Terms'}
        </h1>

        <nav className="mt-6 flex flex-wrap gap-3 text-sm">
          {['privacy', 'lgpd', 'cookies', 'terms'].map((id) => (
            <a key={id} href={`#${id}`} className="text-primary-light hover:underline">
              {isPt
                ? { privacy: 'Privacidade', lgpd: 'LGPD', cookies: 'Cookies', terms: 'Termos' }[id]
                : { privacy: 'Privacy', lgpd: 'LGPD', cookies: 'Cookies', terms: 'Terms' }[id]}
            </a>
          ))}
        </nav>

        <div className="mt-10 space-y-10 text-text-secondary leading-relaxed">
          <div id="privacy">
            <h2 className="text-xl font-heading font-bold text-text-primary">
              {isPt ? 'Política de Privacidade' : 'Privacy Policy'}
            </h2>
            <p className="mt-3">
              {isPt
                ? 'A Linvo coleta os seguintes dados através do formulário de waitlist: nome, e-mail, perfil profissional e, opcionalmente, telefone, nome do condomínio e quantidade de unidades. Esses dados são utilizados exclusivamente para comunicação sobre o produto e convite para o programa piloto. Os dados são armazenados no Formspree e podem ser exportados para Google Sheets para gestão interna. Mantemos os dados enquanto forem relevantes ou até solicitação de exclusão.'
                : 'Linvo collects the following data through the waitlist form: name, email, professional profile, and optionally phone number, building name, and number of units. This data is used exclusively for product communication and pilot program invitations. Data is stored on Formspree and may be exported to Google Sheets for internal management. We retain data while relevant or until deletion is requested.'}
            </p>
          </div>

          <div id="lgpd">
            <h2 className="text-xl font-heading font-bold text-text-primary">
              {isPt ? 'Conformidade LGPD' : 'LGPD Compliance'}
            </h2>
            <p className="mt-3">
              {isPt
                ? 'A base legal para o tratamento dos seus dados é o consentimento fornecido ao preencher o formulário. Você tem direito de acessar, corrigir, excluir e solicitar a portabilidade dos seus dados. Para exercer seus direitos, entre em contato pelo e-mail disponível na página de contato.'
                : 'The legal basis for processing your data is the consent provided when filling out the form. You have the right to access, correct, delete, and request portability of your data. To exercise your rights, contact us through the email available on the contact page.'}
            </p>
          </div>

          <div id="cookies">
            <h2 className="text-xl font-heading font-bold text-text-primary">Cookies</h2>
            <p className="mt-3">
              {isPt
                ? 'Utilizamos cookies essenciais (localStorage para preferência de idioma e consentimento de cookies). Cookies analíticos (Google Analytics) são ativados apenas com seu consentimento explícito através do banner de cookies.'
                : 'We use essential cookies (localStorage for language preference and cookie consent). Analytical cookies (Google Analytics) are only activated with your explicit consent through the cookie banner.'}
            </p>
          </div>

          <div id="terms">
            <h2 className="text-xl font-heading font-bold text-text-primary">
              {isPt ? 'Termos de Uso' : 'Terms of Use'}
            </h2>
            <p className="mt-3">
              {isPt
                ? 'O uso deste site está sujeito a estes termos. Todo o conteúdo, incluindo textos, imagens e marca Linvo, é propriedade intelectual da Linvo. É proibida a reprodução sem autorização prévia. A Linvo não se responsabiliza por indisponibilidades temporárias do site.'
                : 'Use of this site is subject to these terms. All content, including text, images, and the Linvo brand, is Linvo\'s intellectual property. Reproduction without prior authorization is prohibited. Linvo is not responsible for temporary site unavailability.'}
            </p>
          </div>

          <p className="text-sm text-text-muted pt-6 border-t border-border">
            {isPt ? 'Última atualização: Março 2026' : 'Last updated: March 2026'}
          </p>
        </div>
      </div>
    </Section>
  );
}
