# carpe-diem

A handy task recorder for people who don't make plans but do care about their efficiency.

# Installation

```bash
npm i -g carpe-diem
```

# Quick Start

## `i will`

The `i will` (alias: `i w`) command means: now I will start doing some task, please record my task details and start timing (optionally, also display a countdown if an expected duration is expected). When I stop the stopwatch by hitting `q`, log my task details, date+time and duration.

The countdown will not affect the actual duration. When time's up, you'll get a reminder, but you can just ignore it and the stopwatch will not stop until you hit `q` explicitly.

### Use a single-line command with flags:

- `i will --do foo bar`: I will do the task named `foo bar`. Start timing.
- `i will --do foo bar --for 2h30m`: I will do the task named `foo bar` and I expect it to take 2 hours and 30 minutes, start timing and countdown.
- `i will --do foo bar --for 2.5h`: same as above. The duration option is parsed from natural language. Thus, You can also write something like `--for 2 hours and 30 minutes` or `--for 2 hrs 30 min`, but personally I find `--for 2h30m` or `--for 2.5h` easier.

Note that you are more likely to use the alias `i w` in reality.

### Interactive mode:

Just `i will` or `i w`. You will be able to select from a list of tasks you've done previously, or you can enter a new task. You will be prompted to select or enter an expected duration (you can write `2.5h` or `2h30min`, as described above), but you can skip this.

### 'Natural language' mode <NOT IMPLEMENTED YET>:

This is inspired by SQL.

- `i will do foo bar` or `i will foo bar` is equivalent to `i will --do foo bar`
- `i will do foo bar for 2.5h` or `i will foo bar for 2.5h` is equivalent to `i will --do foo bar --for 2.5h`

## `i continue` <NOT IMPLEMENTED YET>

This will continue the previous task. The countdown will continue if there is one.

## `i did`

The `i did` (alias: `i d`) command means: I did some task, and I know when it started and how long it took. Please log my task details, date+time and duration.

### Use a single-line command with flags:

(Note that you are more likely to use the alias `i d` in reality.)

- `i did --do foo bar --at 15:00 --for 2.5h`
- `i did --do foo bar --at 15:00 yesterday --for 2.5h`
- `i did --do foo bar --at 15:00 on Monday --for 2.5h`

Self-explainatory, isn't it?

### Interactive mode:

Just `i did` or `i d`. Similar to the interative mode of `i will`, but you have to specify the start time and duration.

### 'Natural language' mode <NOT IMPLEMENTED YET>:

## `i show`

- `i show log`: show the log (the list of tasks you've done), in JSON format