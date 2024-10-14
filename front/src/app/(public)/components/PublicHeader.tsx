import Image from "next/image";

export const PublicHeader = () => {
  return (
    <header className="flex justify-center p-5">
      <div className="flex max-md:flex-col justify-between max-md:items-center max-md:gap-5 w-full max-w-screen-xl">
        <Image
          src="/static/images/logos/LogoAzul.png"
          alt="logo-engeplus"
          width={143}
          height={40}
        />

        <div className="flex items-center gap-5">
          <a href="https://www.linkedin.com/company/engelus/" target="_blank">
            <Image
              src="/static/images/social/linkedin_logo.png"
              alt="linkedin-logo"
              width={24}
              height={24}
            />
          </a>
          <a href="https://www.facebook.com/portalengeplus" target="_blank">
            <Image
              src="/static/images/social/facebook_logo.png"
              alt="facebook-logo"
              width={24}
              height={24}
            />
          </a>
          <a href="https://www.instagram.com/portalengeplus/" target="_blank">
            <Image
              src="/static/images/social/instagram_logo.png"
              alt="instagram-logo"
              width={24}
              height={24}
            />
          </a>
          <a
            href="https://www.youtube.com/c/PortalEngeplusOficial?sub_confirmation=1"
            target="_blank"
          >
            <Image
              src="/static/images/social/youtube_logo.png"
              alt="youtube-logo"
              width={24}
              height={24}
            />
          </a>

          <a className="font-bold hover:underline" href="tel:(48) 3431-4700">
            (48) 3431-4700
          </a>
        </div>
      </div>
    </header>
  );
};
