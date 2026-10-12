const imgContent = "/projects/music-robber/figma/abd1b4c6-4545-4053-99f1-7dbba2f65c1a.png";
const imgImage65 = "/projects/music-robber/figma/bab86d51-406f-4dc4-ab58-3601098048bb.png";
const imgIPhone16ProBlackTitaniumPortrait = "/projects/music-robber/figma/aaa3e280-dd54-4436-a540-cc82ba91ed4a.png";

export default function IPhone16Pro() {
  return (
    <div className="relative size-full" data-node-id="32:25320" data-name="iPhone 16 Pro">
      <div className="absolute h-[655.5px] left-0 overflow-clip rounded-[45px] top-0 w-[301.5px]" data-node-id="32:25321" data-name="Content">
        <img decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none rounded-[45px] size-full" src={imgContent} />
        <div className="-translate-x-1/2 -translate-y-1/2 absolute h-[655.5px] left-1/2 top-1/2 w-[301.5px]" data-node-id="32:25322" data-name="image 65">
          <img decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgImage65} />
        </div>
      </div>
      <div className="absolute h-[690px] left-[-18px] top-[-17.25px] w-[337.5px]" data-node-id="32:25323" data-name="iPhone 16 Pro - Black Titanium - Portrait">
        <img decoding="async" alt="" className="absolute inset-0 max-w-none object-cover pointer-events-none size-full" src={imgIPhone16ProBlackTitaniumPortrait} />
      </div>
    </div>
  );
}
