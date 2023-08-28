import useInfoModal from "@/app/hooks/use-info-modal";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { ScrollArea } from "../ui/scroll-area";

const InfoModal = () => {
  const infoModal = useInfoModal();

  return (
    <Dialog open={infoModal.isOpen} onOpenChange={infoModal.onClose}>
      <DialogContent className="fixed h-auto w-5/6 overflow-y-auto border-none rounded-lg shadow-xl dark:shadow-blue-900">
        {/* <ScrollArea className="h-[300px] p-4 md:p-0 md:h-full"> */}
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Information
            </div>
          </DialogTitle>
          <DialogDescription className="h-[250px] text-start pt-2 font-medium">
            <ScrollArea className="h-[240px] shadow-inner p-2 dark:shadow-blue-900">
              <p className="font-bold mb-2">Measurements</p>
              <ul className="list-disc ml-4 mb-2">
                <li>
                  {" "}
                  <span className="font-bold">Neck:</span> is the circumference
                  of the neck (in centimeters).
                </li>
                <li>
                  <span className="font-bold">Chest:</span> is the circumference
                  of the chest at the level of the nipples (in centimeters).
                </li>
                <li>
                  <span className="font-bold">Biceps:</span> at the peak of the
                  biceps (in centimeters).
                </li>
                <li>
                  <span className="font-bold">Abdomen:</span> is the
                  circumference of the waist at the navel for men, or the waist
                  and hip measurements for women (in centimeters).
                </li>
                <li>
                  <span className="font-bold">Waist:</span> is the circumference
                  of the waist at its narrowest point (in centimeters).
                </li>
                <li>
                  <span className="font-bold">Hip (for women):</span> is the
                  circumference of the hips at their widest point (in
                  centimeters).
                </li>
                <li>
                  <span className="font-bold">Buttocks:</span> is the
                  circumference of the buttocks at their widest point (in
                  centimeters).
                </li>
                <li>
                  <span className="font-bold">Thigh:</span> is the circumference
                  at the point just below the buttock line (in centimeters).
                </li>
                <li>
                  <span className="font-bold">Calf:</span> is the circumference
                  of the calf at its widest point (in centimeters).
                </li>
              </ul>
              <p className="font-bold mb-2">Body fat calculations</p>
              <p className="font-bold">For men</p>
              <p>
                % Body Fat = 86.010 * log10(abdomen - neck) - 70.041 *
                log10(height) + 36.76
              </p>
              <p className="font-bold mt-2">For women</p>
              <p>
                % Body Fat = 163.205 * log10(waist + hip - neck) - 97.684 *
                log10(height) - 78.387
              </p>
              <p className="font-bold mt-2">References</p>
              <ul className="list-decimal ml-4 text-xs">
                <li>
                  Hodgdon, J. A., & Beckett, M. B. (1984). Prediction of percent
                  body fat for U.S. Navy men and women from body circumferences
                  and height. Reports No. 84-29 and 84-11. Naval Health Research
                  Center, San Diego, CA.
                </li>
              </ul>
            </ScrollArea>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default InfoModal;
