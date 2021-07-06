/**
 * i2cIO block
 */
//% color=#008080 icon="\u2746" block="i2cio"
namespace i2cio {
    let I2C_ADDR = 0x10;
    /**
     * Write byte data to the specified registor
     * @param addr registor address, eg: 0x80
     * @param dat is the data will be write, eg: 0x05
     */
    //% block="write registor address %addr|byte %dat"
    export function writeReg(addr: number, dat: number): void {
        let buf = pins.createBuffer(2);
        buf[0] = addr;
        buf[1] = dat;
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }

    /**
     * Read byte data from the specified registor
     * @param addr registor address, eg: 0x80
     */
    //% block="read data from registor address %addr"
    export function readReg(addr: number): number {
        pins.i2cWriteNumber(I2C_ADDR, addr, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt8BE);
    }

    /**
     * Write word data to the specified registor
     * @param addr eeprom address, eg: 0x80
     * @param dat is the data will be write, eg: 0x1234
     */
    //% block="write registor address %addr|word %dat"
    export function writeReg16(addr: number, dat: number): void {
        let buf = pins.createBuffer(3);
        buf[0] = addr;
        buf[1] = dat & 0xff;
        buf[2] = dat >> 8;
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }

    /**
     * Read word data from the specified registor
     * @param addr registor address, eg: 0x80
     */
    //% block="read word from registor address %addr"
    export function readReg16(addr: number): number {
        pins.i2cWriteNumber(I2C_ADDR, addr, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.UInt16BE);
    }

    /**
     * Write double word data to the specified registor
     * @param addr registor address, eg: 0x80
     * @param dat is the data will be write, eg: 0x12345678
     */
    //% block="write registor address %addr|dword %dat"
    export function writeReg32(addr: number, dat: number): void {
        let buf = pins.createBuffer(5);
        buf[0] = addr;
        buf[1] = dat & 0xff;
        buf[2] = dat >> 8;
        buf[3] = dat >> 16;
        buf[4] = dat >> 24;
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }

    /**
     * Read double word data from the specified registor
     * @param addr eeprom address, eg: 0x80
     */
    //% block="read dword from registor address %addr"
    export function readReg32(addr: number): number {
        pins.i2cWriteNumber(I2C_ADDR, addr, NumberFormat.UInt8BE);
        return pins.i2cReadNumber(I2C_ADDR, NumberFormat.Int32BE);
    }

    /**
     * Write data to the specified registor
     * @param addr registor address, eg: 0x00
     * @param dat is the data will be write, eg: 5
     */
    //% block="registor address %addr|write buf %dat"
    export function writeBuf(addr: number, dat: number[]): void {
        let buf = pins.createBuffer(dat.length + 1);
        buf[0] = addr;
        for(let i=0;i<dat.length;i++){
            buf[i + 1] = dat[i] & 0xff;
        }
        pins.i2cWriteBuffer(I2C_ADDR, buf)
    }

    /**
     * Read data from the specified registor
     * @param addr registor address, eg: 0x00
     * @param size read data count, eg: 16
     */
    //% block="registor address %addr|read size %size"
    export function readBuf(addr: number, size: number): number[] {
        let retbuf:number[]=[];

        pins.i2cWriteNumber(I2C_ADDR, addr, NumberFormat.UInt8BE);
        let buf = pins.i2cReadBuffer(I2C_ADDR, size);
        for(let i=0;i<size;i++){
            retbuf.push(buf[i]);
        }
        return retbuf;
    }

    /**
     * set i2c address
     * @param addr i2c address, eg: 0x50
     */
    //% block="i2c address set to %addr"
    export function setI2cAddress(addr: number): void {
        I2C_ADDR = addr
    }
}
