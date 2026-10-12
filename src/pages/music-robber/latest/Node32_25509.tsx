const imgCover = "/projects/music-robber/figma/b76a6f10-a8bf-4004-a18f-4545e80159a2.png";
const imgCover1 = "/projects/music-robber/figma/a155b713-8a56-4f30-aa39-6bf83180d379.png";
const imgCover2 = "/projects/music-robber/figma/39941283-9871-435b-b974-8d64896769e6.png";
const imgCartIcon = "/projects/music-robber/figma/e8f72810-bbb6-46e1-abd0-ff54e412ca62.svg";
const imgGroup = "/projects/music-robber/figma/b95de961-2b50-4c0c-a5ff-20ec827a2fc9.svg";

export default function Frame98() {
  return (
    <div className="bg-[rgba(255,255,255,0)] overflow-clip relative rounded-[26.339px] size-full" data-node-id="32:25509">
      <div className="absolute content-stretch flex gap-[8.78px] items-center left-[16.46px] pointer-events-none top-[17.56px]" data-node-id="32:25510">
        <div className="relative rounded-[8.78px] shrink-0 size-[52.679px]" data-node-id="32:25511" data-name="Cover">
          <img decoding="async" alt="" className="absolute inset-0 max-w-none object-contain rounded-[8.78px] size-full" src={imgCover} />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_17.56px_0px_rgba(255,255,255,0.75)]" />
        </div>
        <div className="relative rounded-[8.78px] shrink-0 size-[52.679px]" data-node-id="32:25512" data-name="Cover">
          <img decoding="async" alt="" className="absolute inset-0 max-w-none object-contain rounded-[8.78px] size-full" src={imgCover1} />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_17.56px_0px_rgba(255,255,255,0.75)]" />
        </div>
        <div className="relative rounded-[8.78px] shrink-0 size-[52.679px]" data-node-id="32:25513" data-name="Cover">
          <img decoding="async" alt="" className="absolute inset-0 max-w-none object-contain rounded-[8.78px] size-full" src={imgCover2} />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_17.56px_0px_rgba(255,255,255,0.75)]" />
        </div>
      </div>
      <div className="absolute content-stretch flex items-center justify-between left-[16.46px] top-[80.12px] w-[274.369px]" data-node-id="32:25514">
        <div className="content-stretch flex gap-[6.585px] items-center relative shrink-0" data-node-id="32:25515">
          <div className="relative shrink-0 size-[26.339px]" data-node-id="32:25516" data-name="Cart-icon">
            <img decoding="async" alt="" className="absolute block inset-0 max-w-none size-full" src={imgCartIcon} />
          </div>
          <div className="content-stretch flex gap-[var(--sapce\/4,4.39px)] items-center relative shrink-0" data-node-id="32:25521" data-name="Component 81">
            <p className="[word-break:break-word] font-['PingFang_SC'] font-semibold leading-[17.56px] not-italic relative shrink-0 text-[17.56px] text-[color:var(--neutral\/0,white)] text-center tracking-[-0.3512px] whitespace-nowrap" data-node-id="I32:25521;861:7060">
              Total: 320
            </p>
            <div className="relative shrink-0 size-[21.95px]" data-node-id="I32:25521;880:7120" data-name="iconoir:coin">
              <div className="absolute inset-[8.33%]" data-node-id="I32:25521;880:7120;861:7066" data-name="Group">
                <div className="absolute inset-[-4.5%]">
                  <img decoding="async" alt="" className="block max-w-none size-full" src={imgGroup} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex h-[29.632px] items-center justify-center px-[8.78px] py-[4.39px] relative rounded-[17.56px] shrink-0 w-[96.578px]" data-node-id="32:25522">
          <div aria-hidden className="absolute bg-[var(--brand\/primary\/0,#f5002d)] inset-0 pointer-events-none rounded-[17.56px]" />
          <p className="[word-break:break-word] font-['PingFang_SC'] font-medium leading-[17.56px] not-italic relative shrink-0 text-[17.56px] text-[color:var(--neutral\/0,white)] tracking-[-0.3512px] whitespace-nowrap" data-node-id="32:25523">
            Purchase
          </p>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_17.56px_0px_rgba(255,255,255,0.75)]" />
        </div>
      </div>
    </div>
  );
}
