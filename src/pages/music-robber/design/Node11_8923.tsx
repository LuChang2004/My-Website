const imgCover = "/projects/music-robber/figma/1e15e320-7a47-4403-8e7f-4e390ea41f6c.png";
const imgCover1 = "/projects/music-robber/figma/405539f5-b64a-47a8-9154-f8853e5b45bc.png";
const imgCover2 = "/projects/music-robber/figma/71156eca-7939-4b62-8edc-9f54ada794c5.png";
const imgCartIcon = "/projects/music-robber/figma/19186b3a-01a7-4275-bbb6-ae7083465bf0.svg";
const imgGroup = "/projects/music-robber/figma/5790fb95-a502-4af4-95d5-6bc7fa9d888a.svg";

export default function Frame98() {
  return (
    <div className="bg-[rgba(255,255,255,0)] overflow-clip relative rounded-[35.119px] size-full" data-node-id="11:8923">
      <div className="absolute content-stretch flex gap-[11.706px] items-center left-[21.95px] pointer-events-none top-[23.41px]" data-node-id="11:8924">
        <div className="relative rounded-[11.706px] shrink-0 size-[70.239px]" data-node-id="11:8925" data-name="Cover">
          <img alt="" className="absolute inset-0 max-w-none object-contain rounded-[11.706px] size-full" decoding="async" src={imgCover} />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_23.413px_0px_rgba(255,255,255,0.75)]" />
        </div>
        <div className="relative rounded-[11.706px] shrink-0 size-[70.239px]" data-node-id="11:8926" data-name="Cover">
          <img alt="" className="absolute inset-0 max-w-none object-contain rounded-[11.706px] size-full" decoding="async" src={imgCover1} />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_23.413px_0px_rgba(255,255,255,0.75)]" />
        </div>
        <div className="relative rounded-[11.706px] shrink-0 size-[70.239px]" data-node-id="11:8927" data-name="Cover">
          <img alt="" className="absolute inset-0 max-w-none object-contain rounded-[11.706px] size-full" decoding="async" src={imgCover2} />
          <div className="absolute inset-0 rounded-[inherit] shadow-[inset_0px_0px_23.413px_0px_rgba(255,255,255,0.75)]" />
        </div>
      </div>
      <div className="absolute content-stretch flex items-center justify-between left-[21.95px] top-[106.82px] w-[365.826px]" data-node-id="11:8928">
        <div className="content-stretch flex gap-[8.78px] items-center relative shrink-0" data-node-id="11:8929">
          <div className="relative shrink-0 size-[35.119px]" data-node-id="11:8930" data-name="Cart-icon">
            <img alt="" className="absolute block inset-0 max-w-none size-full" decoding="async" src={imgCartIcon} />
          </div>
          <div className="content-stretch flex gap-[var(--sapce\/4,5.853px)] items-center relative shrink-0" data-node-id="11:8935" data-name="Component 81">
            <p className="[word-break:break-word] font-['PingFang_SC'] font-bold leading-[23.413px] not-italic relative shrink-0 text-[23.41px] text-[color:var(--neutral\/0,white)] text-center tracking-[-0.4682px] whitespace-nowrap" data-node-id="I11:8935;861:7060">
              Total: 320
            </p>
            <div className="relative shrink-0 size-[29.266px]" data-node-id="I11:8935;880:7120" data-name="iconoir:coin">
              <div className="absolute inset-[8.33%]" data-node-id="I11:8935;880:7120;861:7066" data-name="Group">
                <div className="absolute inset-[-4.5%]">
                  <img alt="" className="block max-w-none size-full" decoding="async" src={imgGroup} />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="content-stretch flex h-[39.509px] items-center justify-center px-[11.706px] py-[5.853px] relative rounded-[23.413px] shrink-0 w-[128.771px]" data-node-id="11:8936">
          <div aria-hidden className="absolute bg-[var(--brand\/primary\/0,#f5002d)] inset-0 pointer-events-none rounded-[23.413px]" />
          <p className="[word-break:break-word] font-['PingFang_SC'] font-medium leading-[23.413px] not-italic relative shrink-0 text-[23.413px] text-[color:var(--neutral\/0,white)] tracking-[-0.4683px] whitespace-nowrap" data-node-id="11:8937">
            Purchase
          </p>
          <div className="absolute inset-0 pointer-events-none rounded-[inherit] shadow-[inset_0px_0px_23.413px_0px_rgba(255,255,255,0.75)]" />
        </div>
      </div>
    </div>
  );
}
