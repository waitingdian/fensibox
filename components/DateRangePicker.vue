<template>
  <el-form style="display: inline-block;"
           inline
           :model="dateForm"
           :rules="thisRules"
           class="dateRangerPicker"
           ref="dateRangerPicker">
    <el-form-item prop="thisStartTime" style="margin-right: 0;">
      <el-tooltip v-if="startTimeTooltips" class="item"
                  effect="dark" :content="startTimeTooltips"
                  placement="top-start">
        <el-date-picker
          ref="dateStartTime"
          v-model="dateForm.thisStartTime"
          :default-value="startDefaultValue"
          class="dateStartTime"
          type="date"
          :editable="editable"
          :disabled="startTimeDisabled"
          @change="handleChangeStart"
          :picker-options="startPickerOptions"
          placeholder="开始日期"
          :style="{
            width: `${width}px`,
            marginRight: `${margin}px`
        }" />
      </el-tooltip>
      <el-date-picker
        v-else
        ref="dateStartTime"
        v-model="dateForm.thisStartTime"
        :default-value="startDefaultValue"
        class="dateStartTime"
        type="date"
        :editable="editable"
        :disabled="startTimeDisabled"
        @change="handleChangeStart"
        :picker-options="startPickerOptions"
        placeholder="开始日期"
        :style="{
          width: `${width}px`,
          marginRight: `${margin}px`
      }" />
    </el-form-item>
    <span style="line-height: 36px;">至</span>
    <el-form-item prop="thisEndTime" style="margin-right: 0;">
      <el-date-picker
        ref="dateEndTime"
        v-model="dateForm.thisEndTime"
        :default-value="endDefaultValue"
        class="dateEndTime"
        type="date"
        :editable="editable"
        :disabled="endTimeDisabled"
        @change="handleChangeEnd"
        :picker-options="endPickerOptions"
        :popper-class="pickerDisableShortcuts"
        placeholder="结束日期"
        :style="{
          width: `${width}px`,
          marginLeft: `${margin}px`
      }" />
    </el-form-item>
  </el-form>
</template>

<script>
  //  import moment from 'moment';
  export default {
    props: {
//      默认打开面板所在月份参数
      startTimeTooltips: [String, Number],
      defaultValue: [String, Number],
      startTime: [String, Number],
      endTime: [String, Number],
      minTime: [String, Number],
      maxTime: [String, Number],
      startTimeDisabled: {
        type: Boolean,
        default: false
      },
      endTimeDisabled: {
        type: Boolean,
        default: false
      },
      startShortcuts: [Array],
      endShortcuts: [Array],
      startTimeDisabledDate: [String, Object],
      rules: [Object],
      width: {
        type: [String, Number],
        default: 150
      },
      margin: {
        type: [String, Number],
        default: 5
      },
      editable: {
        type: Boolean,
        default: false
      }
    },
    data () {
      return {
        dateForm: {
          thisStartTime: this.startTime,
          thisEndTime: this.endTime
        },
        thisRules: {
          thisStartTime: this.rules ? this.rules.startTime : '',
          thisEndTime: this.rules ? this.rules.endTime : ''
        }
      };
    },
    computed: {
      startPickerOptions () {
        return {
          disabledDate: (time) => {
            let isDisabled = false;
            if (this.minTime || this.maxTime) {
              isDisabled = this.dateGetTime(time) < this.dateGetTime(this.minTime) || this.dateGetTime(time) > this.dateGetTime(this.maxTime);
            }
            if (!isDisabled && this.dateForm.thisEndTime) {
              isDisabled = this.dateGetTime(time) > this.dateGetTime(this.dateForm.thisEndTime);
            }
            if (!isDisabled && this.startTimeDisabledDate) {
              isDisabled = this.dateGetTime(time) < this.dateGetTime(this.startTimeDisabledDate.start) || this.dateGetTime(time) > this.dateGetTime(this.startTimeDisabledDate.end);
            }
            return isDisabled;
          },
          shortcuts: this.startShortcuts
        };
      },
      endPickerOptions () {
        return {
          disabledDate: (time) => {
            let isDisabled = false;
            if (this.minTime || this.maxTime) {
              isDisabled = this.dateGetTime(time) < this.dateGetTime(this.minTime) || this.dateGetTime(time) > this.dateGetTime(this.maxTime);
            }
            if (!isDisabled && this.dateForm.thisStartTime) {
              isDisabled = this.dateGetTime(time) < this.dateGetTime(this.dateForm.thisStartTime);
            }
            return isDisabled;
          },
          shortcuts: this.endShortcuts
        };
      },
      pickerDisableShortcuts () {
        if (this.endShortcuts) {
          if (this.$refs.dateEndTime && this.$refs.dateEndTime.popperElm) {
            this.$nextTick(() => {
              this.$refs.dateEndTime.popperElm.className = this.$refs.dateEndTime.popperElm.className.replace(/pickerDisableShortcuts/g, '');
              if (!this.dateForm.thisStartTime) {
                this.$refs.dateEndTime.popperElm.className = this.$refs.dateEndTime.popperElm.className + ' pickerDisableShortcuts';
              }
            });
          }
          if (!this.dateForm.thisStartTime) {
            return 'pickerDisableShortcuts';
          } else {
            return '';
          }
        }
      },
//      起始时间默认时间
      startDefaultValue () {
        return this.endTime || this.defaultValue;
      },
//      终止时间默认时间
      endDefaultValue () {
        return this.startTime || this.defaultValue;
      }
    },
    watch: {
      'startTime' (val) {
        if (val === this.dateForm.thisStartTime) return;
        if (val) {
          this.$emit('update:startTime', this.timeToDateString(val));
        }
        this.dateForm.thisStartTime = val;
      },
      'endTime' (val) {
        if (val === this.dateForm.thisEndTime) return;
        if (val) {
          this.$emit('update:endTime', this.timeToDateString(val));
        }
        this.dateForm.thisEndTime = val;
      },
      'startDefaultValue' () {
        this.$refs.dateStartTime.picker = null;
      },
      'endDefaultValue' () {
        this.$refs.dateEndTime.picker = null;
      }
    },
    methods: {
      handleChangeStart (value = '') {
//        设置终止日期默认月份面板
        if (value !== '') {
          this.$refs.dateEndTime.defaultValue = value;
        }
        if (this.minTime && this.dateGetTime(value) < this.dateGetTime(this.minTime)) {
          value = this.minTime;
        }
        if (this.maxTime && this.dateGetTime(value) > this.dateGetTime(this.maxTime)) {
          value = this.maxTime;
        }
        if (this.dateForm.thisEndTime && this.dateGetTime(value) > this.dateGetTime(this.dateForm.thisEndTime)) {
          value = this.dateForm.thisEndTime;
        }
        this.$emit('update:startTime', value);
        this.$emit('change', {startTime: value});
        if (value && !this.dateForm.thisEndTime && !this.endTimeDisabled) {
//          this.$refs.dateEndTime.showPicker();
        }
      },
      handleChangeEnd (value = '') {
        if (this.minTime && this.dateGetTime(value) < this.dateGetTime(this.minTime)) {
          value = this.minTime;
        }
        if (this.maxTime && this.dateGetTime(value) > this.dateGetTime(this.maxTime)) {
          value = this.maxTime;
        }
        if (this.dateForm.thisStartTime && this.dateGetTime(value) < this.dateGetTime(this.dateForm.thisStartTime)) {
          value = this.dateForm.thisStartTime;
        }
        this.$emit('update:endTime', value);
        this.$emit('change', {endTime: value});
        if (value && !this.dateForm.thisStartTime && !this.startTimeDisabled) {
//          this.$refs.dateStartTime.showPicker();
        }
      },
      dateGetTime (date) {
        if (date) {
          if (!isNaN(Number(date))) {
            date = Number(date);
          }
          let time = new Date(date);
          time.setHours(0, 0, 0, 0);
          return time.getTime();
        }
      },
      timeToDateString (value, divider) {
        if (value) {
          divider = divider || '-';
          let d = new Date(value);
          let year = d.getFullYear();
          let month = d.getMonth() + 1;
          let date = d.getDate();
          if (month >= 1 && month <= 9) {
            month = "0" + month;
          }
          if (date >= 0 && date <= 9) {
            date = "0" + date;
          }
          return year + divider + month + divider + date;
        }
      },
      validate (cbFN) {
        console.log(22)
        this.$refs['dateRangerPicker'].validate((valid) => {
          if (valid) {
            cbFN(true);
          } else {
            cbFN(false);
          }
        });
      }
    }
  };
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
  .pickerDisableShortcuts .el-picker-panel__shortcut {
    opacity: .3;
    cursor: not-allowed;
  }
</style>
