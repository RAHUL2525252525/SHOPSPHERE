package com.shopsphere.backend.service;

import com.shopsphere.backend.entity.Address;
import com.shopsphere.backend.repository.AddressRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressService {

    @Autowired
    private AddressRepository repository;

    public Address save(Address address) {

        if (Boolean.TRUE.equals(address.getDefaultAddress())) {

            List<Address> list =
                    repository.findByUserEmail(address.getUserEmail());

            for (Address a : list) {

                a.setDefaultAddress(false);

            }

            repository.saveAll(list);

        }

        return repository.save(address);

    }

    public List<Address> getAddresses(String email) {

        return repository.findByUserEmail(email);

    }

    public Address update(Long id, Address address) {

        Address old = repository.findById(id).orElse(null);

        if (old == null) {

            return null;

        }

        address.setId(id);

        return repository.save(address);

    }

    public void delete(Long id) {

        repository.deleteById(id);

    }

}