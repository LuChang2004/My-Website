const imgContent = "/projects/music-robber/figma/349497fa-b004-4ae3-87ec-0388629601c4.png";
const imgImage65 = "/projects/music-robber/figma/206929de-749a-4b94-9733-2f57076bf04d.png";
const imgIPhone16ProBlackTitaniumPortrait = "/projects/music-robber/figma/61ae4e37-a461-4bbc-83cd-87ceb78de766.png";

export default function IPhone16Pro() {
  return (
    <div className="relative size-full" data-node-id="11:8734" data-name="iPhone 16 Pro">
      <div className="absolute h-[874px] left-0 overflow-clip rounded-[60px] top-0 w-[402px]" data-node-id="11:8735" data-name="Content">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[60px] size-full" decoding="async" src={imgContent} />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[874px] left-1/2 top-1/2 w-[402px]" data-node-id="11:8736" data-name="image 65">
          <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" decoding="async" src={imgImage65} />
        </div>
      </div>
      <div className="absolute h-[920px] left-[-24px] top-[-23px] w-[450px]" data-node-id="11:8737" data-name="iPhone 16 Pro - Black Titanium - Portrait">
        <img alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" decoding="async" src={imgIPhone16ProBlackTitaniumPortrait} />
      </div>
    </div>
  );
}
