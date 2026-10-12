const imgGroup = "/projects/music-robber/figma/b4da63b6-8719-4220-a911-836c8544c519.svg";
const imgIconKnife = "/projects/music-robber/figma/87245a78-a21b-4f08-bc4e-e788d0e0acf6.svg";
const imgCurrentLocationIcon = "/projects/music-robber/figma/e0044c2e-c84d-4890-8170-30045f352532.svg";
const imgArrow = "/projects/music-robber/figma/7421944c-7d9f-49a2-a0a5-629b3a537871.svg";
const imgHomeIcon = "/projects/music-robber/figma/bc99e985-13bb-4d5e-8149-24cad7a11863.svg";
const imgSearchIcon = "/projects/music-robber/figma/de40b666-d814-4e82-8f4d-3068a77912c7.svg";
const imgMapFeatures = "/projects/music-robber/figma/8b552419-2f8e-4676-8100-1f098035fcf7.svg";
const imgImage6 = "/projects/music-robber/figma/eca39a85-aba5-40dc-8cc0-5bf1f04d30ca.png";
const imgCover = "/projects/music-robber/figma/af2ce23c-26ed-4589-b2c9-70679df6da33.png";
const imgCover1 = "/projects/music-robber/figma/f052df12-df88-43f5-b591-146434f8bd7e.png";
const imgCover2 = "/projects/music-robber/figma/6db173b4-2b85-4a43-98ea-0175b2d4f318.png";
const imgVector6 = "/projects/music-robber/figma/2fa827cd-55dc-4204-82f5-82c59249a706.svg";
const imgRectangle11 = "/projects/music-robber/figma/9b0eaa98-749d-42eb-9d63-de6e7552750e.svg";
const imgVector4 = "/projects/music-robber/figma/10ad2abe-bad6-4a3b-bf60-f4f743adaa9c.svg";
const imgRectangle12 = "/projects/music-robber/figma/7146d4c4-97c8-46d5-b1df-8eae648a01cf.svg";
const imgVector5 = "/projects/music-robber/figma/84148dc7-0307-4f86-9449-459045cf26b4.svg";
const imgRectangle13 = "/projects/music-robber/figma/12eaaef9-f0e1-41cd-a196-110a480c7976.svg";
const imgIconKnife1 = "/projects/music-robber/figma/2a1f8b75-1b15-4f9b-aeec-b057e385fd82.svg";
const imgIconKnife2 = "/projects/music-robber/figma/b7d4b5c5-4f75-40ea-9b8e-635309e461ee.svg";
const imgIconKnife3 = "/projects/music-robber/figma/46bb74ec-b506-44e0-933d-5882fa68acc6.svg";
const imgFrame147 = "/projects/music-robber/figma/75f1c991-29db-4136-a514-97b1a60c6182.svg";
const imgCover3 = "/projects/music-robber/figma/23f29ec4-1175-4ad6-bce1-5a9a4f29d7f5.png";
const imgEllipse30 = "/projects/music-robber/figma/1c97a2d3-81ef-4aec-85b9-f9102c2a4086.png";
const imgMusicControlButtons = "/projects/music-robber/figma/54b0615d-1959-4bba-b5ab-2d78182c787e.svg";
const imgFrame = "/projects/music-robber/figma/4cc1a511-0bad-43c5-9fe5-867869e02631.svg";
const imgFrame1 = "/projects/music-robber/figma/4ef2d7a7-55b4-4c96-a9c3-5ce04ee987a6.svg";
const imgFrame2 = "/projects/music-robber/figma/cea0b9f9-6977-4f31-8f77-9be49c5dfb11.svg";
const imgCellularConnection = "/projects/music-robber/figma/f56d4c15-8d85-4f7a-958c-1a262fce5fc5.svg";
const imgWifi = "/projects/music-robber/figma/cea3dbeb-a3eb-48c6-a924-4921f4401d9d.svg";
const imgBattery = "/projects/music-robber/figma/d6adff88-90c4-4b38-aed5-2cd336360fb4.svg";

function IconoirCoin({ className }: { className?: string }) {
  return (
    <div className={className || "relative size-[20px]"} data-node-id="2:85" data-name="iconoir:coin">
      <div className="absolute inset-[8.33%]" data-node-id="2:86" data-name="Group">
        <div className="absolute inset-[-4.5%]">
          <img alt="" className="block max-w-none size-full" decoding="async" src={imgGroup} />
        </div>
      </div>
    </div>
  );
}

function IconKnife({ className }: { className?: string }) {
  return (
    <div className={className || "h-[23.002px] relative w-[14.984px]"} data-node-id="2:249" data-name="Icon-Knife">
      <div className="absolute inset-[0_-3.44%_0_0]">
        <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife} />
      </div>
    </div>
  );
}

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
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife1} />
          </div>
        </div>
        <div className="absolute inset-[64.6%_42.6%_31.9%_55.1%]" data-node-id="11:8413" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife1} />
          </div>
        </div>
        <div className="absolute inset-[80.1%_19.9%_16.4%_77.8%]" data-node-id="11:8414" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife1} />
          </div>
        </div>
        <div className="absolute inset-[19.3%_70.1%_77.2%_27.6%]" data-node-id="11:8415" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife2} />
          </div>
        </div>
        <div className="absolute inset-[69.7%_55.7%_26.8%_42%]" data-node-id="11:8416" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife2} />
          </div>
        </div>
        <div className="absolute inset-[10.6%_17.6%_85.9%_80.1%]" data-node-id="11:8417" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife2} />
          </div>
        </div>
        <div className="absolute inset-[16.8%_64.2%_79.7%_33.5%]" data-node-id="11:8418" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife3} />
          </div>
        </div>
        <div className="absolute inset-[49.2%_86.2%_47.3%_11.5%]" data-node-id="11:8419" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife3} />
          </div>
        </div>
        <div className="absolute inset-[7.9%_21%_88.6%_76.7%]" data-node-id="11:8420" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife3} />
          </div>
        </div>
        <div className="absolute inset-[30.4%_22.2%_66.1%_75.5%]" data-node-id="11:8421" data-name="Icon-Knife">
          <div className="absolute inset-[0_-3.44%_0_0]">
            <img alt="" className="block max-w-none size-full" decoding="async" src={imgIconKnife3} />
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

export default function IPhone16Pro42() {
  return (
    <div className="bg-[var(--neutral\/700,black)] overflow-clip relative rounded-[var(--sapce\/40,40px)] size-full" data-node-id="11:8694" data-name="iPhone 16 Pro - 42">
      <MapDemo className="absolute left-[-363px] size-[1000px] top-[-124px]" />
      <MaskForBg className="absolute h-[874px] left-0 top-0 w-[402px]" />
      <BottomTabBarRobberyHub className="-translate-x-1/2 absolute bottom-[15px] h-[42px] left-[calc(50%-2px)] overflow-clip rounded-[var(--sapce\/32,32px)] w-[382px]" />
      <MapFeatures className="absolute h-[96px] left-[354px] top-[196px] w-[48px]" />
      <SearchBox className="-translate-x-1/2 absolute h-[40px] left-[calc(50%+0.5px)] overflow-clip rounded-[var(--sapce\/24,24px)] top-[136px] w-[379px]" />
      <CurrentLocation className="-translate-x-1/2 absolute h-[68px] left-[calc(50%+1px)] top-[61px] w-[374px]" />
      <div className="absolute bg-[rgba(255,255,255,0)] bottom-[75px] h-[52px] left-[3.3%] right-[5.1%] rounded-[var(--sapce\/12,12px)]" data-node-id="11:8701" data-name="Current Song">
        <div className="absolute left-[8px] rounded-[var(--sapce\/8,8px)] size-[40px] top-[6px]" data-node-id="11:8702" data-name="Cover">
          <img alt="" className="absolute inset-0 max-w-none object-contain pointer-events-none rounded-[var(--sapce\/8,8px)] size-full" decoding="async" src={imgCover} />
        </div>
        <div className="absolute content-stretch flex items-center left-[64px] top-[18px] w-[252.244px]" data-node-id="11:8703" data-name="Info">
          <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[16px] not-italic relative shrink-0 text-[16px] text-[color:var(--neutral\/0,white)] tracking-[-0.32px] whitespace-nowrap" data-node-id="11:8704">
            Young And Beautiful
          </p>
        </div>
        <div className="absolute left-[296.73px] size-[20px] top-[16px]" data-node-id="11:8705" data-name="Music Control Buttons">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgMusicControlButtons} />
        </div>
        <div className="absolute left-[315.73px] size-[50px] top-px" data-node-id="11:8706" data-name="Frame">
          <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgFrame} />
        </div>
      </div>
      <div className="absolute backdrop-blur-[4px] bg-gradient-to-b from-[rgba(123,28,16,0.9)] h-[876px] left-0 overflow-clip rounded-tl-[32px] rounded-tr-[32px] to-[rgba(0,0,0,0.9)] top-0 w-[402px]" data-node-id="11:8709" data-name="Mask">
        <div className="-translate-x-1/2 absolute left-[calc(50%-1px)] rounded-[var(--sapce\/8,8px)] shadow-[0px_0px_16px_0px_rgba(255,255,255,0.75)] size-[350px] top-[109px]" data-node-id="11:8710" data-name="Cover">
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded-[var(--sapce\/8,8px)]">
            <img alt="" className="absolute left-0 max-w-none size-full top-0" decoding="async" src={imgCover3} />
          </div>
        </div>
        <div className="[word-break:break-word] absolute content-stretch flex flex-col items-start left-[25px] not-italic top-[481px] w-[171px]" data-node-id="11:8711">
          <p className="font-['PingFang_SC'] font-medium leading-[20px] relative shrink-0 text-[20px] text-[color:var(--neutral\/0,white)] w-full" data-node-id="11:8712">
            Good Luck, Babe!
          </p>
          <p className="font-['PingFang_SC'] leading-[16px] relative shrink-0 text-[16px] text-[color:var(--neutral\/100,#e0e0e0)] w-full" data-node-id="11:8713">
            Chappell Roan
          </p>
        </div>
        <div className="-translate-x-1/2 absolute bg-[var(--brand\/primary\/0,#f5002d)] content-stretch flex gap-[var(--sapce\/8,8px)] items-center left-1/2 px-[var(--sapce\/32,32px)] py-[var(--sapce\/12,12px)] rounded-[var(--sapce\/24,24px)] top-[698px]" data-node-id="11:8714">
          <div className="relative shrink-0 size-[24px]" data-node-id="11:8715" data-name="Frame">
            <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgFrame1} />
          </div>
          <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[16px] not-italic relative shrink-0 text-[16px] text-[color:var(--neutral\/0,white)] tracking-[-0.32px] whitespace-nowrap" data-node-id="11:8717">
            Like it
          </p>
        </div>
        <div className="absolute content-stretch flex flex-col gap-[var(--sapce\/6,6px)] items-center left-[97px] top-[599px] w-[206px]" data-node-id="11:8718">
          <p className="[word-break:break-word] font-['PingFang_SC'] leading-[18px] not-italic relative shrink-0 text-[16px] text-center text-white w-full" data-node-id="11:8719">
            You are robbed by
          </p>
          <div className="h-[64px] relative rounded-[var(--sapce\/32,32px)] shrink-0 w-full" data-node-id="11:8720" style={{ backgroundImage: "linear-gradient(90deg, rgba(0, 0, 0, 0.2) 0%, rgba(102, 102, 102, 0.2) 100%), linear-gradient(90deg, rgb(113, 0, 21) 0%, rgb(113, 0, 21) 100%)" }}>
            <div className="absolute left-[8px] size-[48px] top-[8px]" data-node-id="11:8721">
              <img alt="" className="absolute block inset-0 max-w-none size-full" height="48" decoding="async" src={imgEllipse30} width="48" />
            </div>
            <p className="[word-break:break-word] absolute font-['PingFang_SC'] font-bold leading-[16px] left-[72px] not-italic text-[16px] text-white top-[24px] tracking-[-0.32px] whitespace-nowrap" data-node-id="11:8722">
              Mitchell
            </p>
            <div className="absolute left-[160px] size-[24px] top-[20px]" data-node-id="11:8723" data-name="Frame">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgFrame2} />
            </div>
          </div>
        </div>
        <div className="-translate-x-1/2 [word-break:break-word] absolute font-['PingFang_SC'] leading-[0] left-[197.5px] not-italic text-[16px] text-center text-white top-[793px] whitespace-nowrap" data-node-id="11:8726">
          <p className="leading-[18px] mb-0">You can free yourself in</p>
          <p className="leading-[18px]">10 seconds</p>
        </div>
        <div className="absolute h-[37px] left-[25px] top-[535px] w-[350px]" data-node-id="11:8727" data-name="Component 74">
          <div className="absolute bg-[var(--neutral\/400,#666)] inset-[24.32%_0_59.46%_0] overflow-clip rounded-[var(--radius\/16,16px)]" data-node-id="I11:8727;561:2450" data-name="Progression bar">
            <div className="absolute bg-[var(--brand\/primary\/0,#f5002d)] h-[6px] left-0 rounded-bl-[var(--radius\/16,16px)] rounded-tl-[var(--radius\/16,16px)] top-0 w-[88px]" data-node-id="I11:8727;562:2452" data-name="Color bar" />
          </div>
          <IconKnife className="absolute inset-[-16.22%_72%_21.62%_21.43%]" />
          <p className="[word-break:break-word] absolute font-['PingFang_SC'] inset-[62.16%_94.29%_0_0] leading-[14px] not-italic text-[12px] text-[color:var(--neutral\/0,white)] text-center whitespace-nowrap" data-node-id="I11:8727;565:2526">
            1:15
          </p>
          <p className="[word-break:break-word] absolute font-['PingFang_SC'] inset-[62.16%_0_0_90.86%] leading-[14px] not-italic text-[12px] text-[color:var(--neutral\/300,#999)] text-center whitespace-nowrap" data-node-id="I11:8727;565:2527">
            -3:45
          </p>
        </div>
        <div className="-translate-x-1/2 absolute content-stretch flex gap-[var(--sapce\/4,4px)] items-center left-[calc(50%+14.05px)] top-[65px]" data-node-id="11:8728" data-name="Component 80">
          <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[16px] not-italic relative shrink-0 text-[16px] text-center text-white tracking-[-0.32px] whitespace-nowrap" data-node-id="I11:8728;861:7060">
            -8
          </p>
          <IconoirCoin className="relative shrink-0 size-[20px]" />
        </div>
      </div>
      <div className="absolute content-stretch flex flex-col h-[50px] items-start left-[-1.27%] pt-[21px] right-[-1.02%] top-0" data-node-id="11:8729" data-name="Status Bar - iPhone">
        <div className="content-stretch flex items-center justify-between relative shrink-0 w-full" data-node-id="I11:8729;2969:19841" data-name="Frame">
          <div className="content-stretch flex flex-[1_0_0] items-center justify-center min-w-px pl-[16px] pr-[6px] relative" data-node-id="I11:8729;2969:18119" data-name="Time">
            <p className="[word-break:break-word] font-['SF_Pro'] font-bold font-[590] leading-[22px] relative shrink-0 text-[17px] text-[color:var(--neutral\/0,white)] text-center whitespace-nowrap" data-node-id="I11:8729;2969:18120" style={{ fontVariationSettings: '"wdth" 100' }}>
              9:41
            </p>
          </div>
          <div className="h-[10px] relative shrink-0 w-[124px]" data-node-id="I11:8729;2969:18121" data-name="Dynamic Island spacer" />
          <div className="content-stretch flex flex-[1_0_0] gap-[7px] items-center justify-center min-w-px pl-[6px] pr-[16px] relative" data-node-id="I11:8729;2969:18122" data-name="Levels">
            <div className="h-[12.226px] relative shrink-0 w-[19.2px]" data-node-id="I11:8729;2969:18123" data-name="Cellular Connection">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgCellularConnection} />
            </div>
            <div className="h-[12.328px] relative shrink-0 w-[17.142px]" data-node-id="I11:8729;2969:18124" data-name="Wifi">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgWifi} />
            </div>
            <div className="h-[13px] relative shrink-0 w-[27.328px]" data-node-id="I11:8729;2969:18125" data-name="Battery">
              <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgBattery} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
