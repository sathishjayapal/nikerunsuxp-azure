export interface NikeData {
  data: RunInfo[];

}
export interface RunInfo {
  id: number;
  name: string;
  run_start_time_str: string;
  run_end_time_str: string;
  run_active_duration_str: string;
}
