package com.oredata.minibankapp.model.exception;

public class NonUniqueException extends RuntimeException{
    public static final String ERROR_MESSAGE = "%s given username is not uniqe";

    public NonUniqueException(String name) {
        super(String.format(ERROR_MESSAGE, name));
    }
}
