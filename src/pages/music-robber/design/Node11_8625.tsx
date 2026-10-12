const imgStateDefault = "/projects/music-robber/figma/e1b61de7-67b5-4613-a431-60e569fdef42.svg";
const imgStateDefault1 = "/projects/music-robber/figma/3949cecc-62e7-4c32-b716-c51ecd75d082.svg";
const imgIconRobberyHub = "/projects/music-robber/figma/2e7bce11-7086-445d-a731-8d532bfb53d3.svg";
const imgIconMusicVault = "/projects/music-robber/figma/7deaf6c8-cda6-4096-a614-9e33ae215551.svg";

type IconRobberInfoProps = {
  className?: string;
  state?: "Default";
};

function IconRobberInfo({ className }: IconRobberInfoProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8381">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateDefault} />
    </div>
  );
}

type IconPlazaProps = {
  className?: string;
  state?: "Default";
};

function IconPlaza({ className }: IconPlazaProps) {
  return (
    <div className={className || "relative size-[52px]"} data-node-id="11:8372">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgStateDefault1} />
    </div>
  );
}

export default function Group104() {
  return (
    <div className="contents relative size-full" data-node-id="11:8625">
      <div className="-translate-x-1/2 absolute backdrop-blur-[10px] bg-[rgba(0,0,0,0.7)] content-stretch flex h-[86px] items-center justify-between left-[calc(50%+280px)] overflow-clip px-[47px] py-[17px] shadow-[0px_-8px_20px_0px_black] top-[317px] w-[402px]" data-node-id="11:8626" data-name="Bottom tab bar">
        <div className="relative shrink-0 size-[52px]" data-node-id="I11:8626;554:2005" data-name="Icon-Robbery hub">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgIconRobberyHub} />
        </div>
        <div className="relative shrink-0 size-[52px]" data-node-id="I11:8626;554:2006" data-name="Icon-Music vault">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgIconMusicVault} />
        </div>
        <IconPlaza className="relative shrink-0 size-[52px]" />
        <IconRobberInfo className="relative shrink-0 size-[52px]" />
      </div>
      <div className="absolute h-[109px] left-[1045px] pointer-events-none rounded-[64px] top-[306px] w-[398px]" data-node-id="11:8627">
        <div aria-hidden className="absolute bg-[rgba(245,0,45,0.05)] inset-0 rounded-[64px]" />
        <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_32px_2px_var(--brand\/primary\/0,#f5002d)]" />
      </div>
    </div>
  );
}
