const imgContent = "/projects/music-robber/figma/c1202144-1329-4544-b279-24066a6205ea.png";
const imgImage61 = "/projects/music-robber/figma/c35f2839-2041-402c-940c-b3b829581c1c.png";
const imgIPhone16ProBlackTitaniumPortrait = "/projects/music-robber/figma/e0fd06d7-ea3e-493b-90e4-3580efcf5934.png";

export default function IPhone16Pro() {
  return (
    <div className="relative size-full" data-node-id="11:8599" data-name="iPhone 16 Pro">
      <div className="absolute h-[874px] left-0 overflow-clip rounded-[60px] top-0 w-[402px]" data-node-id="11:8600" data-name="Content">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[60px] size-full" decoding="async" src={imgContent} />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[874px] left-1/2 top-1/2 w-[402px]" data-node-id="11:8601" data-name="image 61">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" decoding="async" src={imgImage61} />
        </div>
      </div>
      <div className="absolute h-[920px] left-[-24px] top-[-23px] w-[450px]" data-node-id="11:8602" data-name="iPhone 16 Pro - Black Titanium - Portrait">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" decoding="async" src={imgIPhone16ProBlackTitaniumPortrait} />
      </div>
    </div>
  );
}
