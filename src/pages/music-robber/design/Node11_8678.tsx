const imgCurrentLocationIcon = "/projects/music-robber/figma/d9db12f9-67f4-4675-b485-c6681b03a4ad.svg";
const imgArrow = "/projects/music-robber/figma/3ab30215-c13a-45e8-aa2b-03c80e57f53c.svg";
const imgHomeIcon = "/projects/music-robber/figma/4175d482-fb6b-4ca8-91bf-4d5c0a82e38d.svg";
const imgSearchIcon = "/projects/music-robber/figma/e517baec-878e-453e-a04f-abac2d3facd6.svg";
const imgMapFeatures = "/projects/music-robber/figma/8f48a1bc-b770-433f-b312-e6d444d6902d.svg";
const imgImage6 = "/projects/music-robber/figma/30e061d6-d263-4568-8634-72f68cd0ea7b.png";
const imgCover = "/projects/music-robber/figma/d535c317-edce-4a51-937a-43ee2e231c05.png";
const imgCover1 = "/projects/music-robber/figma/c3a34d64-ac55-418b-afb1-24ad161481aa.png";
const imgCover2 = "/projects/music-robber/figma/f3645d68-1db6-498a-8f57-5f366a6da919.png";
const imgVector6 = "/projects/music-robber/figma/d78324ff-f1d0-42d5-9336-d2e0e9ed83e4.svg";
const imgRectangle11 = "/projects/music-robber/figma/502beeb2-8264-476d-b837-280fd308075a.svg";
const imgVector4 = "/projects/music-robber/figma/64babcc5-6586-4221-a1d6-847f1d60b170.svg";
const imgRectangle12 = "/projects/music-robber/figma/2867076e-f5bd-4136-96f0-a5e59aae1994.svg";
const imgVector5 = "/projects/music-robber/figma/859795dd-af59-4f83-8ae1-b0480c905349.svg";
const imgRectangle13 = "/projects/music-robber/figma/887f793d-1637-46dd-9180-cf54dfd0cfb3.svg";
const imgIconKnife = "/projects/music-robber/figma/63c602a3-5384-4901-a7e6-4ddd32ae54a8.svg";
const imgIconKnife1 = "/projects/music-robber/figma/d160f0e7-f6de-433c-bd76-639627e708d4.svg";
const imgIconKnife2 = "/projects/music-robber/figma/4052bafa-8521-4186-925b-592946996052.svg";
const imgFrame147 = "/projects/music-robber/figma/0dac705b-2c58-4834-9c3e-97ae78539dd1.svg";
const imgCellularConnection = "/projects/music-robber/figma/cdf957bd-eacd-4330-9bca-91425d7b06b0.svg";
const imgWifi = "/projects/music-robber/figma/f518ab22-661a-47f1-95c9-ba1de6d59326.svg";
const imgBattery = "/projects/music-robber/figma/e205af09-3e0a-4676-89ab-0a333eda3f2c.svg";
const imgMusicControlButtons = "/projects/music-robber/figma/e64d8e2c-08d0-4ac5-915f-2d3250aa59a6.svg";
const imgFrame = "/projects/music-robber/figma/db7b5367-7d6b-4438-92bf-633f6ef7693e.svg";

type CurrentLocationProps = {
  className?: string;
  property1?: "Folded";
};

function CurrentLocation({ className }: CurrentLocationProps) {
  return (
    <div className={className || "h-[68px] relative w-[374px]"} data-node-id="2:341">
      <div className="absolute backdrop-blur-[3px] bg-[rgba(0,0,0,0.75)] inset-0 rounded-[32px]" data-node-id="2:343" data-name="Heading-shape" />
      <div className="-translate-x-1/2 -translate-y-1/2 absolute content-stretch flex gap-[8px] items-center left-[calc(50%-0.5px)] top-[calc(50%+0.5px)]" data-node-id="2:344" data-name="Location info">
        <div className="relative shrink-0 size-[32px]" data-node-id="2:345" data-name="Current location-icon">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgCurrentLocationIcon} />
        </div>
        <div className="[word-break:break-word] content-stretch flex flex-col gap-[var(--sapce\/4,4px)] items-start not-italic relative shrink-0 w-[147px]" data-node-id="2:349" data-name="Text">
          <p className="font-['PingFang_SC'] font-bold leading-[16px] relative shrink-0 text-[16px] text-white tracking-[-0.32px] whitespace-nowrap" data-node-id="2:350">
            The Bund, Shanghai
          </p>
          <p className="font-['PingFang_SC'] h-[11px] leading-[14px] min-w-full relative shrink-0 text-[12px] text-[color:var(--neutral\/300,#999)] w-[min-content]" data-node-id="2:351">
            Shanghai 1st Travel Route
          </p>
        </div>
      </div>
      <div className="absolute flex items-center justify-center right-[24px] size-[28px] top-[20px]" data-node-id="2:352">
        <div className="-rotate-90 flex-none">
          <div className="relative size-[28px]" data-name="Arrow">
            <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgArrow} />
          </div>
        </div>
      </div>
      <div className="absolute left-[24px] size-[28px] top-[19px]" data-node-id="2:353" data-name="Home-icon">
        <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgHomeIcon} />
      </div>
    </div>
  );
}

type SearchBoxProps = {
  className?: string;
  property1?: "Expand";
};

function SearchBox({ className }: SearchBoxProps) {
  return (
    <div className={className || "h-[40px] overflow-clip relative rounded-[var(--sapce\\/24,24px)] w-[319px]"} data-node-id="2:238">
      <div className="-translate-y-1/2 absolute right-[17px] size-[24px] top-1/2" data-node-id="2:239" data-name="Search-icon">
        <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgSearchIcon} />
      </div>
      <div className="-translate-y-1/2 [word-break:break-word] absolute flex flex-col font-['PingFang_SC'] font-bold justify-center leading-[0] left-[17px] not-italic text-[16px] text-[color:var(--neutral\/100,#e0e0e0)] top-1/2 tracking-[-0.32px] whitespace-nowrap" data-node-id="2:240">
        <p className="leading-[16px]">Search</p>
      </div>
    </div>
  );
}

function MapFeatures({ className }: { className?: string }) {
  return (
    <div className={className || "h-[96px] relative w-[48px]"} data-node-id="2:315" data-name="Map features">
      <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgMapFeatures} />
    </div>
  );
}

function BottomTabBarRobberyHub({ className }: { className?: string }) {
  return (
    <div className={className || "h-[42px] overflow-clip relative rounded-[var(--sapce\\/32,32px)] w-[382px]"} data-node-id="11:8427" data-name="Bottom tab bar - Robbery hub">
      <div className="absolute bg-[rgba(247,247,247,0.35)] inset-[9.43%_233px_7.55%_4px] rounded-[var(--sapce\/24,24px)]" data-node-id="11:8428" />
      <p className="[word-break:break-word] absolute font-['PingFang_SC'] font-bold leading-[16px] left-[calc(50%-149px)] not-italic text-[16px] text-[color:var(--neutral\/0,white)] top-[calc(50%-8px)] tracking-[-0.32px] whitespace-nowrap" data-node-id="11:8429">
        Exploring
      </p>
      <p className="[word-break:break-word] absolute font-['PingFang_SC'] font-bold leading-[16px] left-[calc(50%-30px)] not-italic text-[16px] text-[color:var(--neutral\/0,white)] top-[calc(50%-8px)] tracking-[-0.32px] whitespace-nowrap" data-node-id="11:8430">
        Robbing
      </p>
      <p className="[word-break:break-word] absolute font-['PingFang_SC'] font-bold leading-[16px] left-[calc(50%+83px)] not-italic text-[16px] text-[color:var(--neutral\/0,white)] top-[calc(50%-8px)] tracking-[-0.32px] whitespace-nowrap" data-node-id="11:8431">
        Stealing
      </p>
    </div>
  );
}

function MaskForBg({ className }: { className?: string }) {
  return (
    <div className={className || "h-[874px] relative w-[402px]"} data-node-id="2:312" data-name="Mask for bg">
      <div className="absolute bg-gradient-to-b from-[rgba(0,0,0,0)] h-[143px] left-0 to-[rgba(0,0,0,0.6)] top-[731px] w-[402px]" data-node-id="2:313" data-name="Low" />
      <div className="absolute flex h-[143px] items-center justify-center left-0 top-0 w-[402px]" data-node-id="2:314">
        <div className="-scale-y-100 flex-none">
          <div className="bg-gradient-to-b from-[rgba(0,0,0,0)] h-[143px] relative to-[rgba(0,0,0,0.35)] w-[402px]" data-name="Up" />
        </div>
      </div>
    </div>
  );
}

function MapDemo({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[1000px]"} data-node-id="11:8400" data-name="Map-demo">
      <div className="absolute aspect-[3000/3000] left-0 right-0 top-0" data-node-id="11:8401" data-name="image 6">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" decoding="async" src={imgImage6} />
      </div>
      <div className="absolute contents inset-[2.9%_9.25%_0.85%_59.2%]" data-node-id="11:8402">
        <div className="absolute inset-[2.9%_9.25%_0.85%_59.2%]" data-node-id="11:8403">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgVector6} />
        </div>
        <div className="absolute inset-[54.2%_27.8%_39.6%_67%]" data-node-id="11:8404" data-name="Component 80">
          <div className="absolute aspect-[52/62] left-0 right-0 top-0" data-node-id="I11:8404;735:4410">
            <div className="absolute inset-[0_0_2.44%_0]">
              <img alt="" className="block max-w-none size-full" decoding="async" src={imgRectangle11} />
            </div>
          </div>
          <div className="absolute inset-[9.68%_11.54%_25.81%_11.54%] rounded-[var(--sapce\/8,8px)]" data-node-id="I11:8404;734:4396" data-name="Cover">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[var(--sapce\/8,8px)] size-full" decoding="async" src={imgCover} />
          </div>
        </div>
      </div>
      <div className="absolute contents inset-[43.75%_55.4%_31.15%_2.7%]" data-node-id="11:8405">
        <div className="absolute inset-[43.75%_55.4%_31.15%_2.7%]" data-node-id="11:8406">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgVector4} />
        </div>
        <div className="absolute bottom-1/2 left-[38.5%] right-[56.3%] top-[43.8%]" data-node-id="11:8407" data-name="Component 77">
          <div className="absolute aspect-[52/62] left-0 right-0 top-0" data-node-id="I11:8407;735:4410">
            <div className="absolute inset-[0_0_2.44%_0]">
              <img alt="" className="block max-w-none size-full" decoding="async" src={imgRectangle12} />
            </div>
          </div>
          <div className="absolute inset-[9.68%_11.54%_25.81%_11.54%] rounded-[var(--sapce\/8,8px)]" data-node-id="I11:8407;734:4396" data-name="Cover">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[var(--sapce\/8,8px)] size-full" decoding="async" src={imgCover1} />
          </div>
        </div>
      </div>
      <div className="absolute contents inset-[75.1%_50.5%_7.35%_23.35%]" data-node-id="11:8408">
        <div className="absolute inset-[78.75%_51.2%_7.35%_23.35%]" data-node-id="11:8409">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgVector5} />
        </div>
        <div className="absolute inset-[75.1%_50.5%_18.7%_44.3%]" data-node-id="11:8410" data-name="Component 78">
          <div className="absolute aspect-[52/62] left-0 right-0 top-0" data-node-id="I11:8410;735:4410">
            <div className="absolute inset-[0_0_2.44%_0]">
              <img alt="" className="block max-w-none size-full" decoding="async" src={imgRectangle13} />
            </div>
          </div>
          <div className="absolute inset-[9.68%_11.54%_25.81%_11.54%] rounded-[var(--sapce\/8,8px)]" data-node-id="I11:8410;734:4396" data-name="Cover">
            <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[var(--sapce\/8,8px)] size-full" decoding="async" src={imgCover2} />
          </div>
        </div>
      </div>
      <div className="absolute contents inset-[7.9%_17.6%_16.4%_11.5%]" data-node-id="11:8411" data-name="Knives">
        <div className="absolute inset-[36.1%_54%_60.4%_43.7%]" data-node-id="11:8412" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife} />
          </div>
        </div>
        <div className="absolute inset-[64.6%_42.6%_31.9%_55.1%]" data-node-id="11:8413" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife} />
          </div>
        </div>
        <div className="absolute inset-[80.1%_19.9%_16.4%_77.8%]" data-node-id="11:8414" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife} />
          </div>
        </div>
        <div className="absolute inset-[19.3%_70.1%_77.2%_27.6%]" data-node-id="11:8415" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife1} />
          </div>
        </div>
        <div className="absolute inset-[69.7%_55.7%_26.8%_42%]" data-node-id="11:8416" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife1} />
          </div>
        </div>
        <div className="absolute inset-[10.6%_17.6%_85.9%_80.1%]" data-node-id="11:8417" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife1} />
          </div>
        </div>
        <div className="absolute inset-[16.8%_64.2%_79.7%_33.5%]" data-node-id="11:8418" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife2} />
          </div>
        </div>
        <div className="absolute inset-[49.2%_86.2%_47.3%_11.5%]" data-node-id="11:8419" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife2} />
          </div>
        </div>
        <div className="absolute inset-[7.9%_21%_88.6%_76.7%]" data-node-id="11:8420" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife2} />
          </div>
        </div>
        <div className="absolute inset-[30.4%_22.2%_66.1%_75.5%]" data-node-id="11:8421" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife2} />
          </div>
        </div>
      </div>
      <div className="absolute h-[538.681px] left-[543px] top-[97px] w-[153.351px]" data-node-id="11:8422">
        <div className="absolute inset-[-1.39%_-4.89%_-0.66%_0]">
          <img alt="" className="block max-w-none size-full" decoding="async" src={imgFrame147} />
        </div>
      </div>
    </div>
  );
}

export default function IPhone16Pro41() {
  return (
    <div className="bg-[var(--neutral\/700,black)] overflow-clip relative rounded-[var(--sapce\/40,40px)] size-full" data-node-id="11:8678" data-name="iPhone 16 Pro - 41">
      <MapDemo className="absolute left-[-363px] size-[1000px] top-[-124px]" />
      <MaskForBg className="absolute h-[874px] left-0 top-0 w-[402px]" />
      <BottomTabBarRobberyHub className="-translate-x-1/2 absolute bottom-[15px] h-[42px] left-[calc(50%-2px)] overflow-clip rounded-[var(--sapce\/32,32px)] w-[382px]" />
      <MapFeatures className="absolute h-[96px] left-[354px] top-[196px] w-[48px]" />
      <SearchBox className="-translate-x-1/2 absolute h-[40px] left-[calc(50%+0.5px)] overflow-clip rounded-[var(--sapce\/24,24px)] top-[136px] w-[379px]" />
      <CurrentLocation className="-translate-x-1/2 absolute h-[68px] left-[calc(50%+1px)] top-[61px] w-[374px]" />
      <div className="absolute content-stretch flex flex-col h-[50px] items-start left-[-1.27%] pt-[21px] right-[-1.02%] top-0" data-node-id="11:8685" data-name="Status Bar - iPhone">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I11:8685;2969:19841" data-name="Frame">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px pl-[16px] pr-[6px] relative" data-node-id="I11:8685;2969:18119" data-name="Time">
            <p className="[word-break:break-word] font-['SF_Pro'] font-bold font-[590] leading-[22px] relative shrink-0 text-[17px] text-[color:var(--neutral\/0,white)] text-center whitespace-nowrap" data-node-id="I11:8685;2969:18120" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[10px] relative shrink-0 w-[124px]" data-node-id="I11:8685;2969:18121" data-name="Dynamic Island spacer" />
          <div className="content-stretch flex flex-[1_0_0] gap-[7px] items-center justify-center min-w-px pl-[6px] pr-[16px] relative" data-node-id="I11:8685;2969:18122" data-name="Levels">
            <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-node-id="I11:8685;2969:18123" data-name="Cellular Connection">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgCellularConnection} />
            </div>
            <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-node-id="I11:8685;2969:18124" data-name="Wifi">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgWifi} />
            </div>
            <div className="h-[13px] relative shrink-0 w-[27.328px]" data-node-id="I11:8685;2969:18125" data-name="Battery">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgBattery} />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-[75px] h-[52px] left-[3.3%] right-[5.1%] rounded-[var(--sapce\/12,12px)]" data-node-id="11:8686" data-name="Current Song">
        <div className="absolute left-[8px] rounded-[var(--sapce\/8,8px)] size-[40px] top-[6px]" data-node-id="11:8687" data-name="Cover">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[var(--sapce\/8,8px)] size-full" decoding="async" src={imgCover} />
        </div>
        <div className="absolute content-stretch flex items-center left-[64px] top-[18px] w-[252.244px]" data-node-id="11:8688" data-name="Info">
          <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[16px] not-italic relative shrink-0 text-[16px] text-[color:var(--neutral\/0,white)] tracking-[-0.32px] whitespace-nowrap" data-node-id="11:8689">
            Young And Beautiful
          </p>
        </div>
        <div className="absolute left-[296.73px] size-[20px] top-[16px]" data-node-id="11:8690" data-name="Music Control Buttons">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgMusicControlButtons} />
        </div>
        <div className="absolute left-[315.73px] size-[50px] top-px" data-node-id="11:8691" data-name="Frame">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgFrame} />
        </div>
      </div>
    </div>
  );
}
