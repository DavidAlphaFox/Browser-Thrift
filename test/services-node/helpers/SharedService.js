//
// Autogenerated by Thrift Compiler (0.10.0)
//
// DO NOT EDIT UNLESS YOU ARE SURE THAT YOU KNOW WHAT YOU ARE DOING
//
"use strict";

var thrift = require('thrift');
var Thrift = thrift.Thrift;
var Q = thrift.Q;


var ttypes = require('./shared_types');
//HELPER FUNCTIONS AND STRUCTURES

var SharedService_getStruct_args = function(args) {
  this.key = null;
  if (args) {
    if (args.key !== undefined && args.key !== null) {
      this.key = args.key;
    }
  }
};
SharedService_getStruct_args.prototype = {};
SharedService_getStruct_args.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 1:
      if (ftype == Thrift.Type.I32) {
        this.key = input.readI32();
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

SharedService_getStruct_args.prototype.write = function(output) {
  output.writeStructBegin('SharedService_getStruct_args');
  if (this.key !== null && this.key !== undefined) {
    output.writeFieldBegin('key', Thrift.Type.I32, 1);
    output.writeI32(this.key);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SharedService_getStruct_result = function(args) {
  this.success = null;
  if (args) {
    if (args.success !== undefined && args.success !== null) {
      this.success = new ttypes.SharedStruct(args.success);
    }
  }
};
SharedService_getStruct_result.prototype = {};
SharedService_getStruct_result.prototype.read = function(input) {
  input.readStructBegin();
  while (true)
  {
    var ret = input.readFieldBegin();
    var fname = ret.fname;
    var ftype = ret.ftype;
    var fid = ret.fid;
    if (ftype == Thrift.Type.STOP) {
      break;
    }
    switch (fid)
    {
      case 0:
      if (ftype == Thrift.Type.STRUCT) {
        this.success = new ttypes.SharedStruct();
        this.success.read(input);
      } else {
        input.skip(ftype);
      }
      break;
      case 0:
        input.skip(ftype);
        break;
      default:
        input.skip(ftype);
    }
    input.readFieldEnd();
  }
  input.readStructEnd();
  return;
};

SharedService_getStruct_result.prototype.write = function(output) {
  output.writeStructBegin('SharedService_getStruct_result');
  if (this.success !== null && this.success !== undefined) {
    output.writeFieldBegin('success', Thrift.Type.STRUCT, 0);
    this.success.write(output);
    output.writeFieldEnd();
  }
  output.writeFieldStop();
  output.writeStructEnd();
  return;
};

var SharedServiceClient = exports.Client = function(output, pClass) {
    this.output = output;
    this.pClass = pClass;
    this._seqid = 0;
    this._reqs = {};
};
SharedServiceClient.prototype = {};
SharedServiceClient.prototype.seqid = function() { return this._seqid; };
SharedServiceClient.prototype.new_seqid = function() { return this._seqid += 1; };
SharedServiceClient.prototype.getStruct = function(key, callback) {
  this._seqid = this.new_seqid();
  if (callback === undefined) {
    var _defer = Q.defer();
    this._reqs[this.seqid()] = function(error, result) {
      if (error) {
        _defer.reject(error);
      } else {
        _defer.resolve(result);
      }
    };
    this.send_getStruct(key);
    return _defer.promise;
  } else {
    this._reqs[this.seqid()] = callback;
    this.send_getStruct(key);
  }
};

SharedServiceClient.prototype.send_getStruct = function(key) {
  var output = new this.pClass(this.output);
  output.writeMessageBegin('getStruct', Thrift.MessageType.CALL, this.seqid());
  var args = new SharedService_getStruct_args();
  args.key = key;
  args.write(output);
  output.writeMessageEnd();
  return this.output.flush();
};

SharedServiceClient.prototype.recv_getStruct = function(input,mtype,rseqid) {
  var callback = this._reqs[rseqid] || function() {};
  delete this._reqs[rseqid];
  if (mtype == Thrift.MessageType.EXCEPTION) {
    var x = new Thrift.TApplicationException();
    x.read(input);
    input.readMessageEnd();
    return callback(x);
  }
  var result = new SharedService_getStruct_result();
  result.read(input);
  input.readMessageEnd();

  if (null !== result.success) {
    return callback(null, result.success);
  }
  return callback('getStruct failed: unknown result');
};
var SharedServiceProcessor = exports.Processor = function(handler) {
  this._handler = handler;
}
;
SharedServiceProcessor.prototype.process = function(input, output) {
  var r = input.readMessageBegin();
  if (this['process_' + r.fname]) {
    return this['process_' + r.fname].call(this, r.rseqid, input, output);
  } else {
    input.skip(Thrift.Type.STRUCT);
    input.readMessageEnd();
    var x = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN_METHOD, 'Unknown function ' + r.fname);
    output.writeMessageBegin(r.fname, Thrift.MessageType.EXCEPTION, r.rseqid);
    x.write(output);
    output.writeMessageEnd();
    output.flush();
  }
}
;
SharedServiceProcessor.prototype.process_getStruct = function(seqid, input, output) {
  var args = new SharedService_getStruct_args();
  args.read(input);
  input.readMessageEnd();
  if (this._handler.getStruct.length === 1) {
    Q.fcall(this._handler.getStruct, args.key)
      .then(function(result) {
        var result_obj = new SharedService_getStruct_result({success: result});
        output.writeMessageBegin("getStruct", Thrift.MessageType.REPLY, seqid);
        result_obj.write(output);
        output.writeMessageEnd();
        output.flush();
      }, function (err) {
        var result;
        result = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getStruct", Thrift.MessageType.EXCEPTION, seqid);
        result.write(output);
        output.writeMessageEnd();
        output.flush();
      });
  } else {
    this._handler.getStruct(args.key, function (err, result) {
      var result_obj;
      if ((err === null || typeof err === 'undefined')) {
        result_obj = new SharedService_getStruct_result((err !== null || typeof err === 'undefined') ? err : {success: result});
        output.writeMessageBegin("getStruct", Thrift.MessageType.REPLY, seqid);
      } else {
        result_obj = new Thrift.TApplicationException(Thrift.TApplicationExceptionType.UNKNOWN, err.message);
        output.writeMessageBegin("getStruct", Thrift.MessageType.EXCEPTION, seqid);
      }
      result_obj.write(output);
      output.writeMessageEnd();
      output.flush();
    });
  }
};
