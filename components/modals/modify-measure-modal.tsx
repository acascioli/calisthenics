"use client";

import { useContext, useEffect, useState } from "react";
import { CalendarIcon, Check, PlusCircle, Zap } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { toast } from "react-hot-toast";
import { supabaseClient } from "@/lib/superbase-client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { Measurements, addMeasureSchema } from "@/schemas/measurements-schema";
import useMeasurements from "@/app/hooks/use-measurements";
import useModifyMeasureModal from "@/app/hooks/use-modify-measure-modal";
import useSelectedId from "@/app/hooks/use_selected-measure";

type MeasurementsFormValues = z.infer<typeof addMeasureSchema>;

// This can come from your database or API.
const defaultValues: Partial<MeasurementsFormValues> = {};

const ModifyMeasureModal = () => {
  const modifyMeasureModal = useModifyMeasureModal();
  const { measurements, setMeasurements } = useMeasurements();
  const { selectedId } = useSelectedId();
  const [loading, setLoading] = useState(false);
  const { getToken, userId } = useAuth();

  const form = useForm<MeasurementsFormValues>({
    resolver: zodResolver(addMeasureSchema),
    defaultValues,
    mode: "onChange",
  });

  useEffect(() => {
    if (measurements) {
      const measurementData = measurements.filter(
        (measurement: Measurements) => measurement.id == selectedId
      )[0];
      if (measurementData) {
        form.setValue("weight", measurementData.weight.toString());
        form.setValue("biceps", measurementData.biceps!.toString());
        form.setValue("chest", measurementData.chest!.toString());
        form.setValue("waist", measurementData.waist!.toString());
        form.setValue("buttocks", measurementData.buttocks!.toString());
        form.setValue("calf", measurementData.calf!.toString());
        form.setValue("thigh", measurementData.thigh!.toString());
        form.setValue("measure_date", new Date(measurementData.measure_date!));
      }
    }
  }, [measurements, selectedId, form]);

  const onSubmit = async (values: MeasurementsFormValues) => {
    try {
      const supabaseAccessToken = await getToken({
        template: "supabase",
      });
      const supabase = await supabaseClient(supabaseAccessToken!);

      const { data } = await supabase
        .from("measurements")
        .update({
          weight: parseFloat(values.weight),
          biceps: parseFloat(values.biceps!),
          chest: parseFloat(values.chest!),
          waist: parseFloat(values.waist!),
          buttocks: parseFloat(values.buttocks!),
          calf: parseFloat(values.calf!),
          thigh: parseFloat(values.thigh!),
          measure_date: values.measure_date,
        })
        .eq("id", selectedId)
        .select();

      const measurementIndex = measurements!.findIndex(
        (measurement: Measurements) => measurement.id == selectedId
      );
      measurements![measurementIndex] = data![0];
      setMeasurements([...measurements!]);

      toast.success("Registration completed.");
      form.reset();
    } catch (e) {
      console.log(e);
      toast.error("Something went wrong...");
    } finally {
      modifyMeasureModal.onClose();
    }
  };

  return (
    <Dialog
      open={modifyMeasureModal.isOpen}
      onOpenChange={modifyMeasureModal.onClose}
    >
      <DialogContent className="fixed h-auto w-5/6 overflow-y-auto border-none rounded-lg shadow-x dark:shadow-blue-900">
        <DialogHeader>
          <DialogTitle className="flex justify-center items-center flex-col gap-y-4 pb-2">
            <div className="flex items-center gap-x-2 font-bold text-xl">
              Modify measurements
            </div>
          </DialogTitle>
          <DialogDescription className="text-center pt-2 space-y-2 font-medium">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8 px-2"
              >
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Weight [kg]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="biceps"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Biceps [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="chest"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Chest [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="waist"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Waist [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="buttocks"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Buttocks [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="calf"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Calf [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="flex space-x-2">
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="thigh"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Titolo</FormLabel> */}
                          <FormControl>
                            <Input
                              placeholder="Thigh [cm]"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  <div className="flex-1">
                    <FormField
                      control={form.control}
                      name="measure_date"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Descrizione</FormLabel> */}
                          <FormControl>
                            <Popover>
                              <PopoverTrigger asChild>
                                <FormControl>
                                  <Button
                                    variant={"outline"}
                                    className={cn(
                                      "w-full pl-3 text-left font-normal",
                                      !field.value && "text-muted-foreground"
                                    )}
                                  >
                                    {field.value
                                      ? format(field.value, "PPP")
                                      : format(new Date(), "PPP")}

                                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                                  </Button>
                                </FormControl>
                              </PopoverTrigger>
                              <PopoverContent
                                className="w-auto p-0"
                                align="start"
                              >
                                <Calendar
                                  mode="single"
                                  selected={field.value}
                                  onSelect={field.onChange}
                                  // disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  // disabled={loading}
                  size="lg"
                  variant="premium"
                  className="w-full"
                >
                  Confirm
                  <PlusCircle className="w-4 h-4 ml-2 " />
                </Button>
              </form>
            </Form>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default ModifyMeasureModal;
